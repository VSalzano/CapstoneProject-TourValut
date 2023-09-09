import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/Models/iregister';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  newUser: IRegister = {
    name: '',
    username: '',
    email: '',
    password: '',
    telefono: '',
    indirizzo: '',
  };

  constructor(private authSvc: AuthService, router: Router) {}

  register() {
    this.authSvc.register(this.newUser).subscribe((data) => {
      console.log(data);
    });
  }

  login() {}
}
