import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './form/form.component';
import { ListeComponent } from './liste/liste.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ItemComponent } from './item/item.component';
import { ArticleVenteComponent } from './article-vente/article-vente.component';
import { ListComponent } from './article-vente/list/list.component';
import { FormulaireComponent } from './article-vente/formulaire/formulaire.component';
import { ItemsComponent } from './article-vente/list/items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    PaginationComponent,
    ItemComponent,
    ArticleVenteComponent,
    ListComponent,
    FormulaireComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
