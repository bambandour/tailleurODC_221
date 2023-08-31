import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
  photo: string = "assets/images/front.png";
  pos!:number;
  // isEditing: boolean = false;

  constructor(private fb: FormBuilder, private articleVenteService: ArticleVenteService) {
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
    this.articleVenteService.all().subscribe((res:Vente)=>{
        this.categories=res.categories
        this.articleConfections=res.articleConfection
        
        // console.log(this.articleConfections);
        
    })
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
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.articleForm.patchValue({ file }); 
      this.url = URL.createObjectURL(file); 
    }
  }

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

  genereCout(){
    this.articleForm.value.confections.map()
  }

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
        data.confections=this.confections.value.map((confection:any)=>{
          return{
            id: confection.id,
            quantite: confection.quantite
          }
        })
        console.log(data);
      const formattedData = {
        libelle: articleData.libelle,
        categorie: articleData.categorie,
        photo: articleData.photo,
        marge: articleData.marge,
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
