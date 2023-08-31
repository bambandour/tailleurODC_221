import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../interfaces/data';
import { Categorie } from '../interfaces/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private urlCategories='http://localhost:8000/api/categories/'
  private urlAdd='http://localhost:8000/api/categorie'
  private urlEdit='http://localhost:8000/api/categorie/'
  private urlDelete='http://localhost:8000/api/categories/'
  private urlSearch='http://localhost:8000/api/search/'
  
  constructor(private http:HttpClient) { }
  getCategories(url:string=this.urlCategories): Observable<Data<Categorie>> {
    return this.http.get<Data<Categorie>>(url);
  }

  addCategories(libelle:string):Observable<Data<Categorie>>{
    const categorie={libelle}
    return this.http.post<Data<Categorie>>(this.urlAdd,categorie)
  }

  searchCategorie(libelle:string): Observable<Data<Categorie>> {
    return this.http.get<Data<Categorie>>(this.urlSearch+libelle);
  }

  editCategorie(libelle:object,id:number):Observable<Data<Categorie>>{
    return this.http.put<Data<Categorie>>(this.urlEdit+id,libelle)
  }
  
  deleteCategorie(idsCat:any):Observable<Data<Categorie>>{
    let options={
      Headers:new HttpHeaders({
        'accept':'application/json',
        'contentType':'application/json'
      }),
      body:idsCat
    }
    return this.http.delete<Data<Categorie>>(this.urlDelete,options)
  }
}
