import { Component, OnInit } from '@angular/core';
import { User, Profile } from 'src/app/models/identity';
import {ProfileService} from './../../services/profile.service';
import { Following } from 'src/app/models/activity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myProfile: Profile;
  profile: Profile;
  
  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getMyProfile();
    this.getMyPost();
    this.getMyFollowing();
    this.getMyFollowers();
  }

  getMyProfile() {
    this.profileService.getMyProfile().subscribe(res => {
      this.myProfile = res;
      console.log(this.myProfile);
    });
  }
  getMyFollowing() {
    this.profileService.getMyFollowing().subscribe(res => {
      this.myProfile.following = res;
      console.log(this.myProfile.following);
    });
  }
  getMyFollowers() {
    this.profileService.getMyFollowers().subscribe(res => {
      this.myProfile.followers = res;
      console.log(this.myProfile.followers);
    });
  }
  getMyPost() {
    this.profileService.getMyPosts().subscribe(res => {
      this.myProfile.own_posts = res;
      console.log(this.myProfile.own_posts);
    });
  }


}
