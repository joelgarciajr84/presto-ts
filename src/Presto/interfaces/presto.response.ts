export interface Stats {
    state: string;
    queued: boolean;
    scheduled: boolean;
    nodes: number;
    totalSplits: number;
    queuedSplits: number;
    runningSplits: number;
    completedSplits: number;
    cpuTimeMillis: number;
    wallTimeMillis: number;
    queuedTimeMillis: number;
    elapsedTimeMillis: number;
    processedRows: number;
    processedBytes: number;
    peakMemoryBytes: number;
    peakTotalMemoryBytes: number;
    peakTaskTotalMemoryBytes: number;
    spilledBytes: number;
}

export interface PrestoResponse<T = any, S = any> {
    id: string;
    infoUri: string;
    nextUri: string;
    stats?: Stats;
    data?: T[];
    warnings?: S[];
    columns?: Column[];
}

export interface Column {
    name: string;
    type: string;
    typeSignature: TypeSignature;
}

export interface TypeSignature {
   rawType: string;
   arguments: TypeArgument[];
}

export interface TypeArgument {
    kind: string;
    value?: number | TypeSignature;
}