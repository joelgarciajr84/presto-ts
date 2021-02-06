import { PrestoQueryParams, Presto, PrestoResponse } from "../src"
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";


describe('Presto Test', () => {

    let requestParams: PrestoQueryParams
    let presto: Presto
    let prestoFake: any
    let prestoResponse: PrestoResponse
    beforeEach(() => {

        requestParams = {
            query: 'SELECT * FROM pedidos',
            catalog: 'mysqldb',
            schema: 'clientes',
            source: 'test-presto',
            user: 'root',
            host: 'localhost',
            port: 8080,
            checkStatusInterval: 1000,
            updatesNotification: (log) => console.log(log),
            errorNotification: (error) => console.error(error)
        }
        presto = new Presto(requestParams)
        prestoFake = Object.getPrototypeOf(presto)
        prestoResponse = {
            id: "20201010_028028208_xxx",
            infoUri: "http://20201010_028028208_xxx",
            nextUri: "http://20201010_028028208_xxx",
            data: [[]],
        }
    })


    it('Should Return Axios Instance', async () => {

        const axiosInstance = axios.create();

        const spyPresto = jest.spyOn(prestoFake, 'request').mockImplementation().mockResolvedValue(axiosInstance)

        const resultPresto = await prestoFake.request()

        expect(spyPresto).toHaveBeenCalled()

        expect(resultPresto).toBe(axiosInstance)

    })

    it('Should Return Presto Response', async () => {

        jest.spyOn(presto, 'go').mockImplementation().mockResolvedValue(prestoResponse)

        const resultPresto = await presto.go()

        expect(resultPresto).toHaveProperty('id')
        expect(resultPresto).toHaveProperty('infoUri')
        expect(resultPresto).toHaveProperty('nextUri')
        expect(resultPresto).toHaveProperty('data')

    })


    it('Should check sendToPresto', async () => {

        const spyPresto = jest.spyOn(prestoFake, 'sendToPresto').mockResolvedValue(prestoResponse)


        const resultPresto = await prestoFake.sendToPresto('URL', 'POST')

        expect(spyPresto).toHaveBeenCalled();

        expect(resultPresto).toHaveProperty('id')
        expect(resultPresto).toHaveProperty('infoUri')
        expect(resultPresto).toHaveProperty('nextUri')
        expect(resultPresto).toHaveProperty('data')

    })

    it('Should reject with error', async () => {

        const resultPresto = jest.spyOn(presto, 'go').mockImplementation(() => {
            throw new Error('erro_presto');
        });
        expect(resultPresto).toThrowError(new Error('erro_presto'))

    })



})