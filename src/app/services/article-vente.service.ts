import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleVente, Vente } from '../interfaces/article';
import { Data } from '../interfaces/data';
import { ServiceParentService } from './service-parent.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleVenteService {
   

   constructor(private avService: ServiceParentService<Vente,ArticleVente>) { }
   public article!:ArticleVente
   all(){
    return this.avService.get();
   }
   add(article:ArticleVente|any){
    return this.avService.add(article);
   }
   delete(id:number){
    return this.avService.deleteArticle(id)
   }
   

}
