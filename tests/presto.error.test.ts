import { PrestoQueryParams, Presto } from "../src"

describe('Presto Test', () => {

    let requestParams: PrestoQueryParams
    let presto: Presto
    let prestoResult: any
    let fakePresto
    let notificationFunction = ((X) => X)
    beforeEach(() => {

        requestParams = {
            query: 'SELECT * FROM pedidos',
            schema: 'clientes',
            source: 'test-presto',
            user: 'root',
            host: 'localhost',
            port: 8080,
            checkStatusInterval: 1000,
            notification: notificationFunction
        } as unknown as PrestoQueryParams
        presto = new Presto(requestParams, {})
        fakePresto = Object.getPrototypeOf(presto);
    })

    xit('Should reject wrong params', async () => {

        jest.spyOn(presto, 'go').mockImplementation().mockRejectedValueOnce('Error')

       
        
        expect(await presto.go()).rejects

        expect(await presto.go()).toThrow('Error')


    })

})