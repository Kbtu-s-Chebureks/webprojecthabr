import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detailed',
  templateUrl: './post-detailed.component.html',
  styleUrls: ['./post-detailed.component.css']
})
export class PostDetailedComponent implements OnInit {
  post : any;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id).subscribe(post => {
      this.post = post;
      console.log(this.post);
      });
  }

}
