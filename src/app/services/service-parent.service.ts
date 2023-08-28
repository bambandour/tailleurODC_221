import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceParentService {
  public apiPost:string=environment.apiUrl
  constructor(private http:HttpClient) { }

  get(url:string=this.apiPost+'articles'):Observable<T>{
    return this.http.get<T>(url)
  }

  add(article:U):Observable<T> {
    return this.http.post<T>(this.apiPost+'articles',article)
  }

  deleteArticle(id:number):Observable<T>{
    let options={
      Headers:new HttpHeaders({
        'accept':'application/json',
        'contentType':'application/json'
      }),
      body:""
    }
    return this.http.delete<T>(this.apiPost+'articles/'+id,options)
  }

  editArticle(libelle:object,id:number):Observable<T>{
    return this.http.put<T>(this.apiPost+'articles/'+id,libelle)
  }

}
