import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Article, ArticleVente, Vente } from '../interfaces/article';
import { Link } from '../interfaces/data';
import { ArticleVenteService } from '../services/article-vente.service';
import { FormulaireComponent } from './formulaire/formulaire.component';

@Component({
  selector: 'app-article-vente',
  templateUrl: './article-vente.component.html',
  styleUrls: ['./article-vente.component.css']
})
export class ArticleVenteComponent implements OnInit{

  public articleForm!:FormGroup
  articleVentes!:ArticleVente[]
  article!:ArticleVente
  links!:Link[]|undefined
  @ViewChild(FormulaireComponent) formulaireComponent!:FormulaireComponent

  constructor(private fb: FormBuilder, private articleService: ArticleVenteService) {
    this.articleForm = this.fb.group({
      photo: [''],
      libelle: [''],
      categorie: [''],
      promo: [false],
      valeur: [null],
      marge: [''],
      confections: this.fb.array([]),
      cout_fabrication: [],
      prix_vente: [],
      reference: [],
    });
  
   }
 
    
  ngOnInit(): void {
    this.articleService.all().subscribe((res)=>{
      this.articleVentes=res.article_vente
      // this.links=res.articleVente.links

    })
  }


  deleteArticle(){
    this.articleService.delete(this.article.id).subscribe((res:Vente) => {
        console.log(res);
        this.articleVentes = this.articleVentes.filter(a => a.id !== this.article.id);
    });
  }

  editArticle(article:ArticleVente){
    console.log(article);
    const conf=this.formulaireComponent.articleForm.get('confections') as FormArray
    this.formulaireComponent.articleForm.patchValue(article)
    while (conf.length) {
      conf.removeAt(0)
    }
    article.confections.forEach((elt)=>{
      conf.push(
        this.fb.group({
          id: elt.id,
          libelle: elt.libelle,
          quantite:elt.quantite,
          prix:elt.prix,
          categorie:elt.categorie
        })
      )
      })
  }

}
