import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    localStorage.removeItem('token');
    this.authService.login(this.username, this.password)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.authService.getMyUser().subscribe(response => {
            console.log(response[0]);
            localStorage.setItem('myUser', JSON.stringify(response[0]));
          });
          this.authService.getMyProfile().subscribe(response => {
            console.log(response[0]);
            localStorage.setItem('myProfile', JSON.stringify(response[0]));
          });
        },
        error => console.log(error)
      );
  }

}
