import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  myProfile: any;
  newPost : any;
  newPostCategoryId: number;
  categories: any[];
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
      console.log(this.myProfile);
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
      const category = this.categories.find(item => Number(this.newPostCategoryId) === item.id);
      this.newPost = {
        id: 9,
        text: this.newText,
        author: this.myProfile.user,
        title: this.newTitle,
        created_at: '11-11-20',
        category: category
      };
      this.newText = "";
      this.newTitle = "";
      this.newPostCategoryId = 0;
    console.log(this.newPost);
  }

}
