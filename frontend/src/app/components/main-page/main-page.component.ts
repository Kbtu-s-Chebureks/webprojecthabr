import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { PostService } from "../../services/post.service";
import { Category } from "../../models/articles";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent implements OnInit {
  categories: Category[];
  posts: any;

  constructor(
    private categoryService: CategoryService,
    private postServices: PostService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
    this.postServices.getPosts().subscribe((res) => {
      this.posts = res;
      console.log(res);
    });
  }
}
