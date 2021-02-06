import { PrestoQueryParams } from '../Presto/interfaces/presto.query.params';
import { Presto } from '../Presto/presto';

describe('Presto Test', () => {

    let requestParams: PrestoQueryParams
    let presto:Presto
    beforeAll(() => {

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

    it('Should Return an Axios Instance', () => {
        presto.go().then((res)=>{
            const prestoResponse = res.data
            expect(prestoResponse).toHaveProperty('stats')
            expect(prestoResponse).toHaveProperty('data')
        })
        
    })

})