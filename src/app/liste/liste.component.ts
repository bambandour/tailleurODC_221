import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { All, Article, Articles } from '../article';
import { Data, datas, Link } from '../data';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit{
  constructor(private articleService: ArticleService) {}
  @Input() articles!: Article[];
  @Input() links:Link[] | undefined=[];

  @Input()arts!:Article[]
  // @Input() articles:Article[]=[];

  @Input() formGroup!:FormGroup;
  ngOnInit(){

    // console.log(this.articles.data);
  }


  deleteArticle(article: Article) {
    // this.articleService.deleteArticle(article.id).subscribe(() => {
    //   const index = this.articles.findIndex(a => a.id === article.id);
    //   if (index !== -1) {
    //     this.articles.splice(index, 1);
    //     this.articles = this.articles.filter(a => a.id !== article.id);
    //   }
    // });
    this.articleService.deleteArticle(article.id).subscribe(() => {
      this.articles = this.articles.filter(a => a.id !== article.id);
    });
  }
  
  editArticle(article: Article) {
    this.articleService.editArticle(article, article.id).subscribe(()=>{
      
    })
  }

  pageChange(url:string){    
    this.articleService.getArticles(url).subscribe((res:Data<Article>)=>{
      this.links=res.links;
      this.arts=res.data
      // this.articles=res.data;
      console.log(res.data);
    }
    )
  }

}
