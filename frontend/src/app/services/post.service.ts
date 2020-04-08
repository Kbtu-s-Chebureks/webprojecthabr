import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { posts} from './../db/post';
import { users} from './../db/users';
import { Post} from './../models/articles';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor() { }

  getPosts(): Observable<any> {
    return of(posts);
  }
}