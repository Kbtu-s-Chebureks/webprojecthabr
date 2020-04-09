import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/identity';

@Component({
  selector: 'app-post-detailed',
  templateUrl: './post-detailed.component.html',
  styleUrls: ['./post-detailed.component.css']
})
export class PostDetailedComponent implements OnInit {
  myProfile: Profile;
  post : any;
  comments: any[] = [];
  likes: any[] = [];
  isLikedByMe = false;
  likeCount = 0;
  newComment = "";
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getPost();
    this.getMyProfile();
  }

  getMyProfile() {
    this.profileService.getMyProfile().subscribe(res => {
      this.myProfile = res;
      console.log(this.myProfile);
    });
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
          console.log(like);
          if(like.WhoLike.id === 0) {
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

  onNewComment(){
    console.log('This is a method that sends data to back');
    console.log(this.newComment);
    
      this.comments.push({
        id: this.comments.length + 1,
        text: this.newComment,
        whoComment: this.myProfile.user
      });


    this.newComment = "";
  }

}
