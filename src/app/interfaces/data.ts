export interface MyData{
    links?:Link[];
    message:string;
    success:boolean;
}
export interface Data<T> extends MyData{
    data:T[] ;
}

export interface datas<T> extends MyData{
    data:T;
}

export interface Link {
    url:string;
    label:string;
    active:boolean;
}

