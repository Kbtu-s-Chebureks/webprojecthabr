import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { categories} from './../db/category';
import { Category} from './../models/articles';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(categories);
  }
}