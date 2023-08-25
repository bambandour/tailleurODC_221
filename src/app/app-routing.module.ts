import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { CategorieComponent } from './categorie/categorie.component';

const routes: Routes = [
  {
    path:'categorie' , component: CategorieComponent
  },
  {
    path:'article' , component: ArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
