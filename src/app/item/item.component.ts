import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Article, Articles } from '../article';

@Component({
  selector: '.app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit{
  @Input() article!: Article;

  @Input() formGroup!:FormGroup;

  @Output() articleDeleted = new EventEmitter<Article>();
  @Output() articleEdited = new EventEmitter<Article>();

  isDeleting = false;
  countdown = 5;
  countdownInterval: any;
  deleteButtonText = 'Supprimer';

  ngOnInit(){
  }

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

  editArticle() {
    this.articleEdited.emit(this.article);
  }

}
