export interface Data<T> {
    data:T[];
    links?:Link[];
    message:string;
    success:boolean;
}

export interface datas<T> {
    data:T;
    links?:Link[];
    message:string;
    success:boolean;
}

export interface Link {
    url:string;
    label:string;
    active:boolean;
}

