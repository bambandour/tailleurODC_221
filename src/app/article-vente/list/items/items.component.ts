import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArticleVente } from 'src/app/interfaces/article';

@Component({
  selector: '.app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit{
  @Input() article!: ArticleVente;
  @Input() formGroup!:FormGroup;

  @Output() articleDeleted = new EventEmitter<ArticleVente>();
  @Output() articleEdited = new EventEmitter<ArticleVente>();

  ngOnInit(){

  }
  isDeleting = false;
  countdown = 4;
  countdownInterval: any;
  deleteButtonText = 'Supprimer';

  deleteArticle() {
    if (this.isDeleting) {
      this.articleDeleted.emit(this.article);
    } else {
      this.isDeleting = true;
      this.countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.countdownInterval);
          this.isDeleting = false;
          this.deleteButtonText = 'Supprimer';
        } else {
          this.deleteButtonText = `OK (${this.countdown})`;
        }
      }, 1000);
    }
  }

}
