import { PrestoQueryParams } from '../Presto/interfaces/presto.query.params';
import { Presto } from '../Presto/presto';
test('Presto', () => {
    const requestParams: PrestoQueryParams = {
        query: 'SELECT * FROM pedidos',
        catalog: 'mysqldb',
        schema: 'clientes',
        source: 'test-presto',
        user: 'root',
        host: 'localhost',
        port: 8080,
        checkStatusInterval: 1000
    }
    const presto = new Presto(requestParams)
    
    
    expect(presto.go()).toHaveBeenCalled()
});