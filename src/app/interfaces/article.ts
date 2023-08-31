import { FormArray } from "@angular/forms";
import { Categorie, Fournisseur } from "./categorie";
import { Link, MyData } from "./data";

export interface Articles extends MyData{
    data: Article[] | ArticleVente[]
    // message: string
    // links?: Link[]
    // succes: boolean
}
export interface Article extends Art{
    prix:number;
    fournisseur:string[];
    
}

export interface Art {
    id:number;
    libelle:string;
    stock:number;
    categorie:string;
    photo:string;
    reference:string;
    quantite?:number
}

export interface ArticleVente extends Art{
    prix_vente:number;
    marge:number;
    cout_fabrication:number;
    promo:boolean;
    valeur:number;
    confections:FormArray
}


export interface All{
    categories:Categorie[];
    fournisseurs:Fournisseur[];
    articles:Articles;
}

export interface Vente{
    categories:Categorie[];
    articleVente:Articles;
    articleConfection:Article[];
}

export interface Suggestion extends Confection{
} 

export interface Confection {
    id: number; 
    quantite: number|null;
    libelle?: string;
}
