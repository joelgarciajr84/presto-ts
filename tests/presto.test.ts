import { PrestoQueryParams, Presto } from "../src"

describe('Presto Test', () => {

    let requestParams: PrestoQueryParams
    let presto: Presto
    beforeEach(() => {

        requestParams = {
            query: 'SELECT * FROM pedidos',
            catalog: 'mysqldb',
            schema: 'clientes',
            source: 'test-presto',
            user: 'root',
            host: 'localhost',
            port: 8080,
            checkStatusInterval: 1000
        }
        presto = new Presto(requestParams)
    })

    it('Should Return Presto Response', async () => {

        jest.spyOn(presto, 'go').mockImplementation().mockResolvedValue({
            id:"20201010_028028208_xxx",
            infoUri:"http://20201010_028028208_xxx",
            nextUri:"http://20201010_028028208_xxx",
            data: [[]],
        }) 

        const resultPresto = await presto.go()

        expect(resultPresto).toHaveProperty('id')
        expect(resultPresto).toHaveProperty('infoUri')
        expect(resultPresto).toHaveProperty('nextUri')
        expect(resultPresto).toHaveProperty('data')

    })

 

})