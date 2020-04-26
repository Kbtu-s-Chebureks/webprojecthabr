import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { categories} from './../db/category';
import { Category} from './../models/articles';
import { posts } from '../db/post';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  BASE_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/categories/`);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/categories/${id}/`);
  }

  getPostsOfCategory(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/categories/${id}/posts`);
  }

}