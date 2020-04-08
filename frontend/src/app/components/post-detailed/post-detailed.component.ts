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
  comments: any[] = [];
  likes: any[] = [];
  isLikedByMe = false;
  likeCount = 0;
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
      this.postService.getCommentsOfPost(this.post.id).subscribe(comments => {
        this.comments = comments;
      });
      this.postService.getLikesOfPost(this.post.id).subscribe(likes => {
        this.likes = likes;
        this.likeCount = this.likes.length;
        this.likes.forEach(like => {
          if(like.own.id === 0) {
            this.isLikedByMe = true;
          }
        });
      });
      });
  }

  onLikeClick(){
    this.isLikedByMe = !this.isLikedByMe;
    if(this.isLikedByMe) this.likeCount++;
    else this.likeCount--;
  }
}
