import { Component, Input, OnChanges, OnInit } from '@angular/core';
// import { FormGroup, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { All, Article } from '../interfaces/article';
import { Categorie, Fournisseur } from '../interfaces/categorie';
import { datas } from '../interfaces/data';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  // public formGroup!:FormGroup;
  constructor(private formBuider:FormBuilder, private articleService: ArticleService){
    this.formGroup = this.formBuider.group({
      libelle: ['', Validators.required,Validators.min(3)],
      prix: ['', Validators.required],
      stock: ['', Validators.required],
      categorie: ['', Validators.required],
      photo: ['', Validators.required],
      reference: [''],
      fournisseurs: [''],
      // fournisseurs: this.formBuider.array([''])
    });
    this.articleService.all().subscribe((res:datas<All>)=>{
      this.fournisseurs=res.data.fournisseurs;
    });
  }
  @Input() formGroup!:FormGroup;
  @Input() categories!:Categorie[];
  @Input() fournisseurs!:Fournisseur[];
  @Input() alls!:any[];
  @Input() auto!:File;
  url='./assets/front.png';
  allFournisseurs!:Fournisseur[];

  selectedFournisseurs: Fournisseur[] = [];

  filteredFournisseurs: Fournisseur[] = [];

  @Input() editedArticle: Article | null = null;

  // ngOnInit(): void {
    
  // }



  // ngOnChanges() {
  //   if (this.editedArticle) {
  //     this.formGroup.patchValue({
  //       libelle: this.editedArticle.libelle,
  //       prix: this.editedArticle.prix,
  //       stock: this.editedArticle.stock,
  //       categoorie: this.editedArticle.categorie,
  //       photo: this.editedArticle.photo,
  //       reference: this.editedArticle.reference,
  //       fournisseurs: this.editedArticle.fournisseur,
  //     });
  //   } else {
  //     this.formGroup.reset();
  //   }
  // }

 
  // loadEditedArticle(article: Article) {
  //   if (this.editedArticle) {
  //         this.formGroup.patchValue({
  //           libelle: this.editedArticle.libelle,
  //           prix: this.editedArticle.prix,
  //           stock: this.editedArticle.stock,
  //           categoorie: this.editedArticle.categorie,
  //           photo: this.editedArticle.photo,
  //           reference: this.editedArticle.reference,
  //           fournisseurs: this.editedArticle.fournisseur,
  //         });
  //       } else {
  //         this.formGroup.reset();
  //       }
  // }
  
  saveArticle(){  
      
    if (this.formGroup.valid) {
      if (this.editedArticle) {
        const updatedArticle = {
          ...this.editedArticle,
          libelle: this.formGroup.value.libelle,
          prix: this.formGroup.value.prix,
          stock: this.formGroup.value.stock,
          categorie: this.formGroup.value.categoorie,
          photo: this.formGroup.value.photo,
          reference: this.formGroup.value.reference,
          fournisseurs: this.formGroup.value.fournisseur,
        };
        this.articleService.editArticle(updatedArticle,this.editedArticle.id).subscribe((res)=>{
          console.log(res);
          
         })
      }else{
        console.log(this.formGroup.value);
        const dataForm:Article=this.formGroup.value
        const libellePrefix = dataForm.libelle.substring(0, 3).toUpperCase();
        const categorie = this.alls.find(c => c.libelle === this.formGroup.value.categorie);
        // console.log(dataForm);
        this.articleService.addArticle(dataForm).subscribe((res)=>{
          console.log(res.data);
        })
      }
      
    }
  }

  libReference($event:Event){
    const libelle=$event.target as HTMLInputElement;
    // const optionValue=libelle.options[libelle].text
    let libellePrefix = this.formGroup.value.libelle.substring(0, 3).toUpperCase();
     let ref=this.formGroup.value.reference=`REF-${libellePrefix}`
     this.formGroup.patchValue({reference:ref})
  }

  catReference($event:Event){
    const selectOption=$event.target as HTMLSelectElement;
    const optionValue=selectOption.options[selectOption.selectedIndex].text
    const libellePrefix = this.formGroup.value.libelle.substring(0, 3).toUpperCase();
    let ref=this.formGroup.value.reference=`REF-${libellePrefix}-${optionValue.toUpperCase()}`;
    this.formGroup.patchValue({reference:ref})
  }


  updateFournisseurs() {
    const fournisseursControl = this.formGroup.get('fournisseurs');
    if (fournisseursControl) {
    // const searchTerm = this.formGroup.get('fournisseurs').value;
    this.filteredFournisseurs = this.fournisseurs.filter(fournisseur =>
      fournisseur.libelle.toLowerCase().includes(fournisseursControl.value.toLowerCase()) 
    );
    }
    
    
  }


  selectFournisseur(fournisseur: Fournisseur) {
    const fournisseursControl = this.formGroup.get('fournisseurs');
    if (fournisseursControl) {
        this.selectedFournisseurs.push(fournisseur);
        fournisseursControl.setValue('');
    this.filteredFournisseurs = this.filteredFournisseurs.filter(item => item.id == fournisseur.id);
      console.log(this.filteredFournisseurs);
       
    // this.updateFournisseursAutocomplete();
    }
  }
  
 

  removeSelectedFournisseur(index: number) {
    this.selectedFournisseurs.splice(index, 1);
  }



  onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.formGroup.patchValue({ file }); 
      this.url = URL.createObjectURL(file); 
    }
  }

  }
