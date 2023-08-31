import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Article, ArticleVente, Vente } from '../interfaces/article';
import { ArticleVenteService } from '../services/article-vente.service';

@Component({
  selector: 'app-article-vente',
  templateUrl: './article-vente.component.html',
  styleUrls: ['./article-vente.component.css']
})
export class ArticleVenteComponent implements OnInit{

  public articleForm!:FormGroup
  articleVentes!:ArticleVente[]
  article!:ArticleVente
  constructor(private formBuilder: FormBuilder, private articleService: ArticleVenteService) { }
  ngOnInit(): void {
    this.articleService.all().subscribe((res)=>{
      console.log(res.articleVente.data);
      this.articleVentes=res.articleVente.data
      
    })
  }


  deleteArticle(){
    this.articleService.delete(this.article.id).subscribe((res:Vente) => {
        console.log(res);
        this.articleVentes = this.articleVentes.filter(a => a.id !== this.article.id);
    });
  }

}
