import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArticleVente } from 'src/app/interfaces/article';
import { ArticleVenteService } from 'src/app/services/article-vente.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  constructor(private articleService: ArticleVenteService){}
  @Input() articleVentes!: ArticleVente[];
  @Input()artVentes!:ArticleVente[];
  @Input() formGroup!:FormGroup;

  ngOnInit(){

  }

  deleteArticle(article: ArticleVente) {
    this.articleService.delete(article.id).subscribe(() => {
      this.articleVentes = this.articleVentes.filter(a => a.id !== article.id);
    });
  }

}
