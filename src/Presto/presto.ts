import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { PrestoQueryParams } from "./interfaces/presto.query.params";
import { PrestoHeaders } from "./interfaces/presto.headers";
import * as http from 'http';
import * as https from 'https';
import { PrestoResponse } from "./interfaces/presto.response";
import { PrestoStats } from "./interfaces/presto.status";

export class Presto {

    constructor(private readonly params: PrestoQueryParams) { }


    private async request(): Promise<AxiosInstance> {
        return axios.create({
            baseURL: `http://${this.params.host}:${this.params.port}`,
            timeout: 1000,
            headers: {
                [PrestoHeaders.USER]: this.params.user,
                [PrestoHeaders.CATALOG]: this.params.catalog,
                [PrestoHeaders.SCHEMA]: this.params.schema,
                [PrestoHeaders.SOURCE]: this.params.source,
                [PrestoHeaders.USER_AGENT]: this.params.source,
                // [PrestoHeaders.AUTHORIZATION]: 'Basic ' + new Buffer(this.params.user + ":" + this.params.password).toString("base64")
            },
        });
    }


    public async go(): Promise<void> {
        try {
            console.log("REQUEST RECEBIDO")
            await this.sendToPresto('/v1/statement/', 'post')

        } catch (error) {
            console.error(error)
            this.params.notification(error)
            throw new Error(JSON.stringify(error));

        }

    }

    private async handlePrestoResponse(resultPresto: PrestoResponse):Promise<void> {
        console.log("GERENCIANDO RESPOSTA")
        // notify the response if stats is finished
        if (resultPresto.stats.state !== PrestoStats.FINISHED) {
            console.log("INSERINDO NA FILA")
            this.insertInTheQueue(resultPresto.nextUri)
        } else {
            this.params.notification(resultPresto);
        }

        //Insert in the queue

    }

    private insertInTheQueue(nextUri: string) {
        console.log("INSERINDO NA FILA")
        setTimeout(async () => {
            console.log('VAI FAZER GET DA FILA');
            this.sendToPresto(nextUri, 'GET');
        }, 2000);

    }


    private async sendToPresto(url: string, method: AxiosRequestConfig['method']): Promise<void> {
        console.log("ENVIANDO AO PRESTO")
        try {
            const request = await this.request()
            let resultPresto: PrestoResponse
            const isFirstRequest: boolean = (method === 'post')

            resultPresto = isFirstRequest
                ? await (await request({ url, method, data: this.params.query })).data
                : await (await request({ url, method })).data

            await this.handlePrestoResponse(resultPresto);


        } catch (error) {
            console.error(error)
            this.params.notification(error);
            throw new Error(JSON.stringify(error));

        }

    }



}












let counter: number = 1
const letMeKnowFunction = (notification: any) => {

    console.log(`RECEBEU ${counter}`)
    console.log(notification)
    counter++
}

const requestParams: PrestoQueryParams = {
    query: 'SELECT * FROM pedidos',
    catalog: 'mysqldb',
    schema: 'clientes',
    source: 'test-presto',
    user: 'root',
    host: 'localhost',
    port: 8080,
    checkStatusInterval: 1000,
    notification: letMeKnowFunction
}
const presto = new Presto(requestParams)

for (let index = 1; index <= 1; index++) {
    console.log(`CLIENTE ENVIANDO REQUEST ${index}`)
    presto.go()
}

// presto.go().then((res) => {
//     console.log(res)
// }).catch((error) => {
//     console.error(error)
// })