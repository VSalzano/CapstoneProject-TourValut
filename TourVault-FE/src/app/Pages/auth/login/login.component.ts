import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/Models/ilogin';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  constructor(private router: Router, private authSvc: AuthService) {}

  user: ILogin = {
    username: '',
    password: '',
  };

  login() {
    this.authSvc.login(this.user).subscribe((data) => {
      console.log(data);
    });
  }
}
