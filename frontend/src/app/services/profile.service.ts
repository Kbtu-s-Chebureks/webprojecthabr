import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {User,Profile} from './../models/identity';
import {users} from './../db/users';
import {profiles} from './../db/profile'
import {following} from './../db/following';
import {followers} from './../db/followers';
import {posts} from './../db/post';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  myid = users[0].id;
  static getMyProfile: any;
  constructor() { }
  
  getProfile(id: number): Observable<any> {
    return of(profiles.find(profiles => profiles.user.id === id));
  }
  getMyProfile(): Observable<any> {
    return of(profiles.find(profiles => profiles.user.id === this.myid));
  }
  getMyFollowing(): Observable<any> {
    return of(following.find(item => item.own.id === this.myid).whoFollowing);
  } 
  getMyFollowers(): Observable<any> {
    return of(followers.find(item => item.own.id === this.myid).WhoFollow);
  } 
  getMyPosts(): Observable<any> {
    return of(posts.filter(post=>post.author.id === this.myid));
  }
}
