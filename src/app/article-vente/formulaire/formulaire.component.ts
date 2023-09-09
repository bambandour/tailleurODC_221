import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { min } from 'rxjs';
import { Art, Article, ArticleVente, Confection, Vente } from 'src/app/interfaces/article';
import { Categorie } from 'src/app/interfaces/categorie';
import { Data } from 'src/app/interfaces/data';
import { ArticleVenteService } from 'src/app/services/article-vente.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit{
  url='./assets/front.png';
  @Input() articleForm: FormGroup;
  @Input() categories!:Categorie[];
  @Input() articleConfections!:Article[]


  id!: number | null;
  libelle: string = '';
  categorie: string ='';
  reference: string = '';
  cout_fabrication: number = 0;
  prix_vente: number = 0;
  marge: number = 0;
  promo: boolean = false;
  // photo: string = "assets/images/front.png";
  pos!:number;
  // isEditing: boolean = false;

  constructor(private fb: FormBuilder, private articleVenteService: ArticleVenteService) {
    this.articleForm = this.fb.group({
      photo: ['./assets/front.png'],
      libelle: ['',Validators.required ],
      categorie: ['',Validators.required],
      promo: [false],
      valeur: [null],
      marge: ['',Validators.required],
      confections: this.fb.array([]),
      cout_fabrication: [15000],
      prix_vente: [20000],
      reference: [],
    });
  }
  ngOnInit(): void {
    this.articleVenteService.all().subscribe((res:Vente)=>{
        this.categories=res.categories
        this.articleConfections=res.articleConfection
    })
  }

  get photo(){
    return this.articleForm.controls['photo']
  }

  get confections() {
    return this.articleForm.get('confections') as FormArray;
  }

  addConfection() {
    this.confections.push(this.fb.group({
      id: [''],
      libelle: [''],
      quantite: [0],
    }));
  }

  removeConfection(index: number) {
    this.confections.removeAt(index);
  }

  onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      let reader = new FileReader();
      reader.onload = () => this.articleForm.get("photo")?.setValue(reader.result)
      reader.readAsDataURL(input.files[0]);
    }
  }

  // onPhotoChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     this.articleForm.patchValue({ file }); 
  //     this.url = URL.createObjectURL(file); 
  //   }
  // }

  libReference($event:Event){
    const libelle=$event.target as HTMLInputElement;
    let libellePrefix = this.articleForm.value.libelle.substring(0, 3).toUpperCase();
     let ref=this.articleForm.value.reference=`REF-${libellePrefix}`
     this.articleForm.patchValue({reference:ref})
  }

  catReference($event:Event){
    const selectOption=$event.target as HTMLSelectElement;
    const optionValue=selectOption.options[selectOption.selectedIndex].text
    const libellePrefix = this.articleForm.value.libelle.substring(0, 3).toUpperCase();
    let ref=this.articleForm.value.reference=`REF-${libellePrefix}-${optionValue.toUpperCase()}`;
    this.articleForm.patchValue({reference:ref})
  }

  // calculateFabricationCost() {
  //   const totalCost = this.confections.controls.reduce((total, confectionGroup) => {
  //     const libelle = confectionGroup.get('libelle')?.value;
  //     const quantite = confectionGroup.get('quantite')?.value;
  
  //     const confection = this.articleConfections.find((c) => c.libelle === libelle);
  //     if (confection) {
  //       return total + confection.prix * quantite;
  //     }
  //     return total;
  //   }, 0);
  
  //   this.articleForm.get('cout_fabrication')?.setValue(totalCost);
  // }
  
  // updateFabricationCost() {
  //   const cout=this.articleForm.get('cout_fabrication')?.value;
  //   const marge = this.articleForm.get('marge')?.value ;
  //   const prixVente = cout + marge;
  //   this.articleForm.get('prix_vente')?.setValue(prixVente);
  // }
  

  // ngAfterViewInit() {
  //   this.confections.controls.forEach((confectionGroup, i) => {
  //     confectionGroup.get('libelle')?.valueChanges.subscribe(() => {
  //       this.updateFabricationCost();
  //     });
  
  //     confectionGroup.get('quantite')?.valueChanges.subscribe(() => {
  //       this.updateFabricationCost();
  //     });
  //   });
  // }

  
  
  
  

  generatePrix(){

  }



  suggestions!:Article[];

  filterConfections(event: Event, index: number) {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    const searchTerm = searchText;
    // if (index==this.pos) {
      this.suggestions =this.articleConfections
      .filter((confection) => confection.libelle.toLowerCase().includes(searchTerm.toLowerCase()));
    //}
    
  }

  selectSuggestion(suggestion:Article, index: number) {
      this.confections.at(index).get('libelle')?.setValue(suggestion.libelle)
      this.confections.at(index).get('id')?.setValue(suggestion.id)
      this.suggestions = []; 
  }
    

  saveArticle() {
    // if (this.articleForm.valid) {
      const articleData:ArticleVente=this.articleForm.value
        const data=this.articleForm.value;
        data.confections=this.confections.value.map((confection:Confection)=>{
          return{
            id: confection.id,
            quantite: confection.quantite
          }
        });
        console.log(data);
      const formattedData = {
        libelle: articleData.libelle,
        categorie: articleData.categorie,
        photo: articleData.photo,
        marge: articleData.marge,
        prix_vente:articleData.prix_vente,
        cout_fabrication:articleData.cout_fabrication,
        confections:data.confections
      };
      console.log(formattedData);
      this.articleVenteService.add(formattedData).subscribe((res)=>{
        console.log(res);
        this.articleForm.reset();
        this.confections.clear();
      })
    //}
  }
}
