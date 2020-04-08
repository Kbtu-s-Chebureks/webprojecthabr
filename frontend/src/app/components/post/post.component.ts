import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/articles';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  posts: any;
  
  constructor(
    private postServices: PostService
    ) { }

  ngOnInit() {
    this.postServices.getPosts().subscribe( res => {
      this.posts = res;
      console.log(res);
    });
  }


}