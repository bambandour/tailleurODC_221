import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { All, Article } from '../article';
import { Categorie } from '../categorie';
import { Data, datas } from '../data';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // apiPost:string=environment.
  constructor(private http:HttpClient) { }

  // allCategories():Observable<Data<Categorie>>{
  //   return this.http.get<Data<Categorie>>(`http://localhost:8000/api/all`)
  // }

  getArticles(url:string=`http://localhost:8000/api/articles`):Observable<Data<Article>>{
    return this.http.get<Data<Article>>(url)
  }
  
  all():Observable<datas<All>>{
    return this.http.get<datas<All>>(`http://localhost:8000/api/allArticle`)
  }

  addArticle(article:Article):Observable<Data<Article>> {
    return this.http.post<Data<Article>>(`http://localhost:8000/api/articles`,article)
  }

  deleteArticle(id:number):Observable<Data<Article>>{
    let options={
      Headers:new HttpHeaders({
        'accept':'application/json',
        'contentType':'application/json'
      }),
      body:""
    }
    return this.http.delete<Data<Article>>(`http://localhost:8000/api/articles/`+id,options)
  }

  editArticle(libelle:object,id:number):Observable<Data<Article>>{
    return this.http.put<Data<Article>>(`http://localhost:8000/api/articles/`+id,libelle)
  }





}
