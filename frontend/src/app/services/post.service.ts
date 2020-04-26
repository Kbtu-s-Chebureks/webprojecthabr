import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { posts} from './../db/post';
import { users} from './../db/users';
import { Post} from './../models/articles';
import { comments } from './../db/comments';
import { likes } from './../db/likes';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASE_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/posts/`);
  }

  getPost(id:number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/posts/${id}/`);
  }

  getCommentsOfPost(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/posts/${id}/comment/`);
  }

  getLikesOfPost(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/api/posts/${id}/like/`);
  }

}