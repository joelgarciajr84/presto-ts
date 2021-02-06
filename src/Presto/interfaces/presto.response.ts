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

export interface PrestoResponse {
    id: string;
    infoUri: string;
    nextUri: string;
    stats: Stats;
    data: Array<any>;
    warnings: any[];
}


