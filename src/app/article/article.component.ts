import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { All, Article, Articles } from '../article';
import { Categorie, Fournisseur } from '../categorie';
import { Data, datas, Link } from '../data';
import { ArticleService } from '../services/article.service';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-article',
  template: `<app-form [alls]=alls></app-form>,
  <app-liste [articles]=articles></app-liste>,
  <app-pagination></app-pagination>
  `,
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
  public formGroup!:FormGroup
  categories:Categorie[]=[];
  public articles!:Article[] ;
  article!:Article
  alls!:All[];
  libelle!:string;
  prix!:number;
  stock!:number;
  categorie!:string;
  photo!:string;
  reference!:string;
  fournisseurs!:Fournisseur[];
  links:Link[]| undefined=[]
  active:Link[]=[]

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService) { }  
  ngOnInit(): void {
    this.articleService.all().subscribe((res?:any)=>{
      this.alls=res.data.categories
    }
    );
    this.getArticles()
    this.getFournisseurs()
    this.getPagination()
  }

  getArticles(){
    this.articleService.getArticles().subscribe((res:Data<Article>)=>{
          this.articles=res.data
          this.links=res.links
            // console.log(this.articles);
        },
        (error)=>{
          console.error('Une erreur est survenue lors du chargement des articles',error)
        })
  }

  pageChange(url:string){    
    this.articleService.getArticles(url).subscribe(res=>{
      this.links=res.links
      this.articles=res.data
      console.log(res.data);
    }
    )
  }

  // chargerPage(event:number){
  //   this.currentPage=event
  //   this.chargerCategories()
  // }

  getPagination(){
    this.articleService.all().subscribe((res:datas<All>)=>{
      this.links=res.data.articles.links
    });
  }


  getFournisseurs(){
    this.articleService.all().subscribe((res:datas<All>)=>{
      this.fournisseurs=res.data.fournisseurs
      // console.log(this.fournisseurs);
    })
  }

  // getArticles(){
  //   this.articleService.all().subscribe((res:datas<All>)=>{
  //     this.articles=res.data.articles.data
  //       // console.log(res.data.articles.links);
  //   })
  // }
  
  deleteArticle(){
    this.articleService.deleteArticle(this.article.id).subscribe((res) => {
        console.log(res.data);
        this.articles = this.articles.filter(a => a.id !== this.article.id);
    });
  }



}
