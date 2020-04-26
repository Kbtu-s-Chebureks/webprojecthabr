import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:8000';

  constructor(
    private http: HttpClient
  ) { }

  login(username, password): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/auth/login/`, {
      username,
      password
    });
  }

  getMyUser(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/auth/me/`);
  }

  getMyProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/auth/my-profile/`);
  }

}
