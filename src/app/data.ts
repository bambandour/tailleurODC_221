export interface MyData{
    links?:Link[];
    message:string;
    success:boolean;
}
export interface Data<T> extends MyData{
    data:T[];
    // links?:Link[];
    // message:string;
    // success:boolean;
}

export interface datas<T> extends MyData{
    data:T;
    // links?:Link[];
    // message:string;
    // success:boolean;
}

export interface Link {
    url:string;
    label:string;
    active:boolean;
}

