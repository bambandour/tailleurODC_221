import { Component ,OnInit} from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Categorie } from '../interfaces/categorie';
import { Data, Link } from '../interfaces/data';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit{
  categories:Categorie[]=[] ;
  currentPage=1;
  nbreElementTotal!:number ;
  newCategorie!:string
  editCategorie!:string;
  id!:number;
  toggle:boolean=false;
  isBtnDisabled:boolean=true;
  isBtnDeleteDisabled:boolean=true;
  pointer=""
  red!:string
  blue!:string
  checkAll:boolean=false
  checked:boolean=true
  tab:number[]=[]
  ids:number[]=[]
  check!:boolean
  backendMessage: string = '';
  objet:object={};
  unCheck:boolean=false;
  allCheck:boolean=false;
  value!:number
  links:Link[]| undefined=[]
  active:Link[]=[]

  constructor(private categoryService: CategorieService) {}

  ngOnInit(): void {
     this.chargerCategories();
  }

  pageChange(url:string){    
    this.categoryService.getCategories(url).subscribe(res=>{
      this.categories=res.data   
      this.links=res.links
    }
    )
  }

  
  chargerCategories():void{
    this.categoryService.getCategories().subscribe(
      (response:Data<Categorie>)=>{        
        this.categories=response.data
        this.links=response.links
      },
      (error)=>{
        console.error('Une erreur est survenue lors du chargement des Categories',error)
      }
    )
  }


  chargerPage(event:number){
    this.currentPage=event
    this.chargerCategories()
  }

  isToggle(){
    if(!this.toggle){
      this.pointer="pointer"
      this.red="red"
      this.blue="black"
      if (this.checkAll===true || this.check) {
        this.isBtnDeleteDisabled=false;
      }
      return
    }
     this.pointer=""
     this.red="black"
     this.blue="blue"
     this.isBtnDeleteDisabled=true;
  }

  ajouterCategories(){    
    if (this.toggle===true) {
      return this.editerCategorie();       
    }else{
      if (this.newCategorie.trim() !== '') {
        this.isBtnDisabled=false;
        this.categoryService.addCategories(this.newCategorie).subscribe(
          (response?)=>{
            this.categories=response.data;             
            this.newCategorie=''
            this.setBackendMessage('La catégorie a été ajouter avec succès.'); 
            location.reload();
            return
          }
        );
      }
    }
  }

  searchLibelle(){
    this.categoryService.searchCategorie(this.newCategorie).subscribe(
      (response?)=>{
            if (response.data.length===0) {
                this.isBtnDisabled=false;
            }else{
                this.isBtnDisabled=true;
            }
            // location.reload();
            return 
          }
          )
  }

  editLibelle(value:string,index:number){
    this.newCategorie=value;
    this.id=index
  }

  isCheckbox(){
    const ischeck=this.categories.filter((cat)=>cat.checked);
    console.log(ischeck);
    
    const id=ischeck.map(cat=>cat.id)
    
    this.tab=id
    
    if (ischeck.length>0) {
      this.isBtnDeleteDisabled=false;
    }else{
      this.isBtnDeleteDisabled=true;
    }
    const filtre=this.categories.filter((cat)=>!cat.checked);
    if (filtre) {
      this.checkAll=false;
    }
    const taille=this.categories.length
    if(ischeck.length==taille){
      this.checkAll=true;
    }
  }

  changeCheckbox(){
    if (this.checkAll) {
    const mesId =this.categories.map(cat=>(cat.checked=this.checkAll))
    const mesIds =this.categories.filter(cat=>(cat.checked)).map(cat=>(cat.id))
    console.log(mesIds);
    this.tab=mesIds
    
    this.isBtnDeleteDisabled=false;
    }else{
      this.categories.map(cat=>(cat.checked=false))
      this.isBtnDeleteDisabled=true;
    }
  }

  editerCategorie(){
    if (this.newCategorie.trim()!=='') {
      const objet={'libelle':this.newCategorie}
      this.categoryService.editCategorie(objet,this.id).subscribe(
        (response?)=>{
          this.setBackendMessage('La catégorie a été modifiée avec succès.');
        }
      );
    }
    this.isBtnDisabled=false
    location.reload();
  }

  supprimerCategorie(){
      this.categoryService.deleteCategorie({ids:this.tab}).subscribe(
        (response?) => {
          this.checkAll=false;
          this.isBtnDeleteDisabled=false;
          this.setBackendMessage('Les catégories sélectionnées ont été supprimées avec succès.');
          location.reload();
        },
        (error) => {
          console.error('Une erreur est survenue lors de la suppression:', error);
          this.setBackendMessage('Les catégories sélectionnées n\'ont été supprimées.');
        }
      );
      
  }

  setBackendMessage(message: string): void {
    this.backendMessage = message;
    setTimeout(() => {
      this.clearBackendMessage();
    }, 4000); 
  }

  clearBackendMessage(): void {
    this.backendMessage = '';
  }
}



