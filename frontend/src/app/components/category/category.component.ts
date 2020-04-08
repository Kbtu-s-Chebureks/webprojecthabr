import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/articles';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  categories: Category[];
  
  constructor(
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe( res => {
      this.categories = res;
    });
  }


}