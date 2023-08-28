export interface CatLib{
    id:number;
    libelle:string;
}

export interface Categorie extends CatLib{
    checked?:boolean;
}

export interface Fournisseur extends CatLib{
    // id:number;
    // libelle:string;
}
