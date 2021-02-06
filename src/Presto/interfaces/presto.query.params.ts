import { PrestoResponse } from "./presto.response";

export interface PrestoQueryParams {
    query: string,
    catalog: string,
    schema: string,
    source: string,
    user:string,
    password?:string,
    host:string,
    port:number,
    checkStatusInterval:number,
    notification?: Function
}
