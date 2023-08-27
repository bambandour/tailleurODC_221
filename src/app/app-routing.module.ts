import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleVenteComponent } from './article-vente/article-vente.component';
import { ArticleComponent } from './article/article.component';
import { CategorieComponent } from './categorie/categorie.component';

const routes: Routes = [
  {
    path:'categorie' , component: CategorieComponent
  },
  {
    path:'article' , component: ArticleComponent
  },
  {
    path:'vente' , component: ArticleVenteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
