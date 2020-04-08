import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { categories} from './../db/category';
import { Category} from './../models/articles';
import { posts } from '../db/post';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(categories);
  }

  getCategory(id: number): Observable<Category> {
    return of(categories.find(category => category.id === id))
  }

  getProductsByCategory(id: number): Observable<any> {
    // const currentCategory = categories.find(category => category.id === id)
    return of(posts.filter(posts => posts.category.id === id))
  }

}