import { Component, Input, OnInit } from '@angular/core';
// import { FormGroup, Validators } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { All, Article } from '../article';
import { Categorie, Fournisseur } from '../categorie';
import { datas } from '../data';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  // public formGroup!:FormGroup;
  constructor(private formBuider:FormBuilder, private articleService: ArticleService){
    
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

  ngOnInit(): void {
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

  saveArticle() {
    // if (this.editForm.valid) {
      if (this.editedArticle) {
        // const updatedArticle: Article = {
        //   ...this.editedArticle,
        //   libelle: this.formGroup.value.libelle,
        //   prix: this.formGroup.value.date
        // };
      } else {
        // const newArticle: Article = {
        //   id: -1, // Remplacez par l'ID approprié
        //   title: this.editForm.value.title,
        //   date: this.editForm.value.date
        // };
      }
    // }
  }

  
  addArticle(){  
    console.log(this.formGroup.value);
      
    if (this.formGroup.valid) {
      const dataForm:Article=this.formGroup.value
      const libellePrefix = dataForm.libelle.substring(0, 3).toUpperCase();
      const categorie = this.alls.find(c => c.libelle === this.formGroup.value.categorie);
      // console.log(dataForm);
      this.articleService.addArticle(dataForm).subscribe((res)=>{
        console.log(res.data);
      })
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
    this.filteredFournisseurs = this.filteredFournisseurs.filter(item => item.id !== fournisseur.id);

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
