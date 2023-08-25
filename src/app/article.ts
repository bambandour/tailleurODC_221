import { Categorie, Fournisseur } from "./categorie";
import { Link } from "./data";

export interface Articles {
    message: string
    data: Article[]
    links?: Link[]
    succes: boolean
}
export interface Article {
    id:number;
    libelle:string;
    prix:number;
    stock:number;
    categorie:string;
    photo:string;
    reference:string;
    fournisseur:string[];
}
export interface All{
    categories:Categorie[];
    fournisseurs:Fournisseur[];
    articles:Articles;
}
