import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/Models/iregister';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  newUser: IRegister = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    telefono: '',
    cittaResidenza: '',
    indirizzo: '',
  };

  isLoading: boolean = false;

  constructor(private authSvc: AuthService, private router: Router) {}
  register() {
    this.isLoading = true;
    this.authSvc.register(this.newUser).subscribe(
      (data) => {
        console.log('utente registrato');
        console.log(data);
        setTimeout(() => {
          this.router.navigate(['/auth', 'login']);
        }, 2000);
      },
      (error) => {
        console.error('Errore durante la registrazione:', error);
        this.isLoading = false;
      }
    );
  }
}
