import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/identity';
import { concat } from 'rxjs';

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
  myUser: any;
  likeid = 0;
  like = {
  }
  commentary = {
    "text": "this.newComment"
  }
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getPost();
    this.getMyProfile();
    this.myUser = JSON.parse(localStorage.getItem('myUser'));
  }

  getMyProfile() {
    this.profileService.getMyProfile().subscribe(res => {
      this.myProfile = res;
      this.myProfile = this.myProfile[0];
      console.log(this.myProfile);
    });
  }
  getPost() {
    console.log("getPost")
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
          if(like.owner.user.id === this.myUser.id) {
            this.isLikedByMe = true;
            this.likeid = like.id;
          }
        });
      });
      });
  }

  onLikeClick(){
    if(this.isLikedByMe){
      this.postService.deleteLikesOfPost(this.post.id, this.likeid ).subscribe(res => {
        console.log("deleted");
        this.getPost();
        this.isLikedByMe = false;
      })
    }
    else {
      this.postService.createLikesOfPost(this.post.id, this.like ).subscribe(res => {
        console.log("created");

        this.getPost();
        this.isLikedByMe = true;
      })
    }
    // this.isLikedByMe = !this.isLikedByMe;
    // if(this.isLikedByMe) this.likeCount++;
    // else this.likeCount--;
  }

  onNewComment(){
    this.commentary = {
      "text": this.newComment
    }
    this.postService.createCommentsOfPost(this.post.id, this.commentary).subscribe(res => {

    })
    console.log(this.commentary);
    


    this.newComment = "";
    this.commentary = {
      "text": ""
    }
  }

}
