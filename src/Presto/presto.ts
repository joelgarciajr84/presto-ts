import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { PrestoQueryParams } from "./interfaces/presto.query.params";
import { PrestoHeaders } from "./interfaces/presto.headers";
import * as http from 'http';
import * as https from 'https';
import { PrestoResponse } from "./interfaces/presto.response";
import { PrestoStats } from "./interfaces/presto.status";
import { PRESTO_STATEMENT_PATH, PREST_HTTP_METHODS } from "./presto.contants";

export class Presto {
   
    constructor(private readonly params: PrestoQueryParams, private readonly httpAgentOptions?: http.AgentOptions) {}


    private async request(): Promise<AxiosInstance> {

        return axios.create({
            baseURL: `http://${this.params.host}:${this.params.port}`,
            headers: {
                [PrestoHeaders.USER]: this.params.user,
                [PrestoHeaders.CATALOG]: this.params.catalog,
                [PrestoHeaders.SCHEMA]: this.params.schema,
                [PrestoHeaders.SOURCE]: this.params.source,
                [PrestoHeaders.USER_AGENT]: this.params.source,
                // [PrestoHeaders.AUTHORIZATION]: 'Basic ' + new Buffer(this.params.user + ":" + this.params.password).toString("base64")
            },
            httpAgent: new http.Agent(this.httpAgentOptions   || {} ),
            httpsAgent: new https.Agent(this.httpAgentOptions || {})

        });
    }


    public async go(): Promise<PrestoResponse> {
        try {
            return await this.sendToPresto(PRESTO_STATEMENT_PATH, PREST_HTTP_METHODS.POST)

        } catch (error) {
            throw new Error(JSON.stringify(error));

        }

    }

    private async sendToPresto(url: string, method: AxiosRequestConfig['method']): Promise<PrestoResponse> {
        
        try {
            const request = await this.request()
            let resultPresto: PrestoResponse
            const isFirstRequest: boolean = (method === PREST_HTTP_METHODS.POST)

            resultPresto = isFirstRequest
                ? await (await request({ url, method, data: this.params.query })).data
                : await (await request({ url, method })).data

            return await this.handlePrestoResponse(resultPresto);


        } catch (error) {
            this.params.notification(error);
            throw new Error(JSON.stringify(error));

        }

    }

    private async handlePrestoResponse(resultPresto: PrestoResponse): Promise<PrestoResponse> {
       

        if (resultPresto.stats.state !== PrestoStats.FINISHED && resultPresto.nextUri ) {

            this.insertInTheQueue(resultPresto.nextUri)

        } else {
            this.params.notification(resultPresto);
            return resultPresto
        }


    }

    private insertInTheQueue(nextUri: string) {
        setTimeout(async () => {
            this.sendToPresto(nextUri, PREST_HTTP_METHODS.GET);
        }, this.params.checkStatusInterval);

    }

}
