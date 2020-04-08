import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { posts} from './../db/post';
import { users} from './../db/users';
import { Post} from './../models/articles';
import { comments } from './../db/comments';
import { likes } from './../db/likes';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor() { }

  getPosts(): Observable<any> {
    return of(posts);
  }

  getPost(id:number): Observable<any> {
    return of(posts.find(post=> post.id === id));
  }

  getCommentsOfPost(id: number): Observable<any> {
    return of(comments.filter(comment => comment.post.id === id));
  }

  getLikesOfPost(id: number): Observable<any> {
    return of(likes.filter(like => like.post.id === id));
  }

}