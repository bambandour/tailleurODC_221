import { Component, Input, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Article } from '../article';
import { Link } from '../data';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  public constructor(private articleService:ArticleService){}
  @Input() links:Link[] | undefined=[];
  @Input() articles:Article[]=[];

  ngOnInit(){


  }

 

}
