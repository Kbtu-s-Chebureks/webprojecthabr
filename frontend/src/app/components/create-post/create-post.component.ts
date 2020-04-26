import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProfileService } from 'src/app/services/profile.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Post } from 'src/app/models/articles';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  myProfile: any;
  newPost : any;
  newPostCategoryId: number;
  categories: any[] = [];
  newTitle = "";
  newText = "";
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getMyProfile();
  }

  getMyProfile() {
    this.profileService.getMyProfile().subscribe(res => {
      this.myProfile = res;
      this.myProfile = this.myProfile[0];
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
    });
    console.log(this.categories);
  }
  onCreatePost(){
    console.log('This is a method that sends data to back');
      // const category = this.categories.find(item => Number(this.newPostCategoryId) === item.id);
      this.newPost = {
        text: this.newText,
        // author: this.myProfile.user,
        title: this.newTitle,
        // created_at: '11-11-20',
        // category: category
      };
      this.categoryService.createPost(this.newPostCategoryId, this.newPost).subscribe(res =>
        this.newPost = null)
      this.newText = "";
      this.newTitle = "";
      this.newPostCategoryId = 0;
    console.log(this.newPost);
  }

}
