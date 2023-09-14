import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GruppoLocker } from 'src/app/Models/GruppoLocker';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Services/auth.service';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  gruppiLocker: GruppoLocker[] = [];
  user: User = {
    id: 0,
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    telefono: '',
    cittaResidenza: '',
    indirizzo: '',
  };
  isElencoLockerAperto = false;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private router: Router,
    private dashSvc: DashboardService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObject: User = JSON.parse(storedUser);
      const username = userObject.username;
      this.dashSvc.getUserByUsername(username).subscribe(
        (user: User) => {
          this.user = user;
          console.log('Utente recuperato:', this.user);
          this.dashSvc.getAllGruppi().subscribe((data: any) => {
            this.gruppiLocker = data;
            console.log('Gruppi Locker recuperati:', this.gruppiLocker);
          });
        },
        (error) => {
          console.error("Errore durante il recupero dell'utente:", error);
        }
      );
    } else {
      console.error('Nessun utente trovato in localStorage.');
    }
  }

  contaLockerLibero(gruppoLocker: GruppoLocker): number {
    let count = 0;

    gruppoLocker.locker.forEach((locker) => {
      if (locker.stato === 'LIBERO') {
        count++;
      }
    });

    return count;
  }

  contaLockerTotali(gruppoLocker: GruppoLocker): number {
    return gruppoLocker.locker.length;
  }

  toggleElencoLocker() {
    this.isElencoLockerAperto = !this.isElencoLockerAperto;
  }

  logout() {
    this.authSvc.logout();
  }
}
