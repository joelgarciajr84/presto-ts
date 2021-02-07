# Presto TS!
![presto typescript](https://i.ibb.co/bmXvQRG/presto-ts.png)
# Description

presto-ts is a npm Typescript lib that enable projects to interact with the SQL Query engine PrestoDB

    npm install --save presto-ts

## Examples

**Running:**

```
import { Presto, PrestoQueryParams, PrestoResponse } from  "presto-ts";

const prestoStatusUpdate  = (prestoNotification:  PrestoResponse):  PrestoResponse  => {

	console.log("NEW PRESTO QUERY STATUS")
	console.log(prestoNotification)
	return  prestoNotification;

}

const errorPresto  = (error:  Error) => {
	console.error(error)
	return  error
}

const  requestParams:  PrestoQueryParams  = {
	query:  'SELECT * FROM pedidos',
	catalog:  'mysqldb',
	schema:  'clientes',
	source:  'test-presto',
	user:  'root',
	password:'xxx',
	host:  'localhost',
	port:  8080,
	isBasicAuth:true,
	checkStatusInterval:  1000,
	updatesNotification:  prestoStatusUpdate,
	errorNotification:  errorPresto

}

const  goPresto  =  new  Presto (requestParams).go()

```

## Presto Results
Every new status from the running query will be send to your updatesNotification function, and for erros the notifications will be send to errorNotification callback function
```
{
  id: '20210206_100029_00169_jcatp',
  infoUri: 'http://localhost:8080/ui/query.html?20210206_100029_00169_jcatp',
  columns: [
    { name: 'id', type: 'integer', typeSignature: [Object] },
    { name: 'total', type: 'bigint', typeSignature: [Object] }
  ],
  stats: {
    state: 'FINISHED',
    queued: false,
    scheduled: true,
    nodes: 1,
    totalSplits: 17,
    queuedSplits: 0,
    runningSplits: 0,
    completedSplits: 17,
    cpuTimeMillis: 15,
    wallTimeMillis: 29,
    queuedTimeMillis: 5,
    elapsedTimeMillis: 1041,
    processedRows: 2,
    processedBytes: 0,
    peakMemoryBytes: 0,
    peakTotalMemoryBytes: 0,
    peakTaskTotalMemoryBytes: 0,
    spilledBytes: 0,
    rootStage: {
      stageId: '0',
      state: 'FINISHED',
      done: true,
      nodes: 1,
      totalSplits: 16,
      queuedSplits: 0,
      runningSplits: 0,
      completedSplits: 16,
      cpuTimeMillis: 1,
      wallTimeMillis: 2,
      processedRows: 2,
      processedBytes: 65,
      subStages: [Array]
    },
    progressPercentage: 100
  },
  warnings: []
}
```
## About PrestoDB

> # Distributed SQL Query Engine for Big Data

<iframe width="560" height="315" src="https://www.youtube.com/embed/67gXN5697Vw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
