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

  loginErrorMsg: string = '';

  login() {
    this.authSvc.login(this.user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(error);
        this.loginErrorMsg =
          'Dati di autenticazione errati. Login non riuscito.';
      }
    );
  }
}
