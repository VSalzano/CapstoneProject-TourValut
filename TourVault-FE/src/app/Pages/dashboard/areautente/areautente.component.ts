import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Services/auth.service';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-areautente',
  templateUrl: './areautente.component.html',
  styleUrls: ['./areautente.component.scss'],
})
export class AreautenteComponent {
  user: User = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    telefono: '',
    cittaResidenza: '',
    indirizzo: '',
    id: 0,
  };

  loading: boolean = false;
  mostraEditArea: boolean = false;
  accessToken: string = '';

  constructor(
    private dashSvc: DashboardService,
    private route: ActivatedRoute,
    private authSvc: AuthService
  ) {
    this.recuperaAccessToken();
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.dashSvc.getUserById(params.id).subscribe((data: User) => {
        this.user = data;
        console.log(data);
      });
    });
  }

  toggleEditArea() {
    this.mostraEditArea = !this.mostraEditArea;
  }

  updateUser() {
    if (this.user.id && this.user) {
      this.loading = true;
      setTimeout(() => {
        this.dashSvc
          .updateUser(this.user.id, this.user, this.accessToken)
          .subscribe(
            (response) => {
              console.log('Utente aggiornato con successo:', response);
              this.loading = false;
              this.toggleEditArea();
            },
            (error) => {
              console.error('Errore di aggiornamento utente', error);
              this.loading = false;
            }
          );
      }, 2000);
    } else {
      console.warn('ID utente o dati utente non validi.');
    }
  }

  recuperaAccessToken(): string {
    const storedUser = localStorage.getItem('user')!;
    const userObject = JSON.parse(storedUser);

    this.accessToken = userObject.accessToken;
    return this.accessToken;
  }

  logout() {
    this.authSvc.logout();
  }
}
