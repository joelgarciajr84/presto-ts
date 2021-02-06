import { PrestoResponse } from "./presto.response";

export interface PrestoQueryParams {
    query: string,
    catalog: string,
    schema: string,
    source: string,
    user:string,
    password?:string,
    isBasicAuth?:boolean,
    host:string,
    port:number,
    checkStatusInterval:number,
    updatesNotification: (data:PrestoResponse)=>any,
    errorNotification: (data:Error)=>any,
}
