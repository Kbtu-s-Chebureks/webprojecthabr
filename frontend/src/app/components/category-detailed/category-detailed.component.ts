import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-detailed',
  templateUrl: './category-detailed.component.html',
  styleUrls: ['./category-detailed.component.css']
})
export class CategoryDetailedComponent implements OnInit {
  posts : any;
  category: any;
  constructor(
    private route: ActivatedRoute,
    private categoryDetailedService: CategoryService
  ) { }

  ngOnInit() {
    this.getPostsByCategory();
    this.getCategory();
  }

  getPostsByCategory() {
    const id = +this.route.snapshot.paramMap.get('id'); 
    this.categoryDetailedService.getPostsOfCategory(id).subscribe(res => {
      this.posts = res;
      console.log(this.posts);
    });
  }
  getCategory() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryDetailedService.getCategory(id).subscribe(category => {
      this.category = category;
      console.log(this.category);
      });
  }
}
