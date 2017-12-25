export type Report = {
    id: number;
    date: Date;
    approved: boolean;
    description: string;
    items: ReportItem[];
    amount: number;
};

export type NewReport = Pick<Report, 'date' | 'approved' | 'description' | 'items'>;

export enum ReportItemType {
    food = 'Food',
    travel = 'Travel',
    training = 'Training',
    transport = 'Transport',
    officeSupplies = 'Office Supplies',
    unselected = ''
}

export type ReportItem = {
    description: string;
    amount: number;
    hasReceipt: boolean;
    type: ReportItemType;
    date: Date;
};

export interface Messenger {
    deliveryMessage(report: Report, user: string): void;
}

export const PS_REPORTS_KEY = 'ps-reports';


type RemoteDataNotFetched = {
    kind: "notFetched";
};
type RemoteDataLoading = {
    kind: "loading";
};
type RemoteDataOK<T> = {
    kind: "ok";
    data: T;
};
type RemoteDataError = {
    kind: "error";
    error: string;
};

export type RemoteData<T> =
    RemoteDataNotFetched | 
    RemoteDataLoading |
    RemoteDataOK<T> |
    RemoteDataError;

export function isRemoteDataOK<T>(remoteData: RemoteData<T>): remoteData is RemoteDataOK<T> {
    return remoteData.kind === "ok";
}

export function isRemoteDataError<T>(remoteData: RemoteData<T>): remoteData is RemoteDataError {
    return remoteData.kind === "error";
}

export function isRemoteDataLoading<T>(remoteData: RemoteData<T>): remoteData is RemoteDataLoading {
    return remoteData.kind === "loading";
}