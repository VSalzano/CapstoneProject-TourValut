import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Deposito } from 'src/app/Models/Deposito';
import { GruppoLocker } from 'src/app/Models/GruppoLocker';
import { User } from 'src/app/Models/User';
import { Locker } from 'src/app/Models/locker';
import { AuthService } from 'src/app/Services/auth.service';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dettagliogruppo',
  templateUrl: './dettagliogruppo.component.html',
  styleUrls: ['./dettagliogruppo.component.scss'],
})
export class DettagliogruppoComponent {
  gruppoLocker!: GruppoLocker;

  user!: User;

  lockerPrenotazione!: Locker;

  idLockerPrenotazione!: number;

  accessToken: string = '';

  togglePrenotazione: boolean = false;

  descrizione: string = '';

  loading: boolean = false;

  constructor(
    private dashSvc: DashboardService,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObject: User = JSON.parse(storedUser);
      const username = userObject.username;
      this.dashSvc.getUserByUsername(username).subscribe(
        (user: User) => {
          this.user = user;
          console.log('Utente recuperato:', this.user);
          return user;
        },
        (error) => {
          console.error("Errore durante il recupero dell'utente:", error);
        }
      );
    } else {
      console.error('Nessun utente trovato in localStorage.');
    }
    this.route.params.subscribe((params: any) => {
      this.dashSvc.getGruppoById(params.id).subscribe((data: GruppoLocker) => {
        this.gruppoLocker = data;
        console.log(data);
      });
    });
    this.recuperaAccessToken();
  }

  ngOnInit() {}

  showLocker(id: number | undefined) {
    if (id !== undefined) {
      this.dashSvc.getLockerById(id).subscribe(
        (locker) => {
          console.log('Locker ottenuto:', locker);
          this.lockerPrenotazione = locker;
          this.togglePrenotazione = true;
        },
        (error) => {
          console.error("Errore durante l'ottenimento del locker:", error);
        }
      );
    } else {
      console.error('ID del locker non definito');
    }
  }

  inviaPrenotazione() {
    this.loading = true;

    setTimeout(() => {
      let deposito: Deposito = {
        user: this.user,
        locker: this.lockerPrenotazione,
        dataOraInizio: new Date().toISOString(),
        stato: 'IN_CORSO',
        descrizione: this.descrizione,
      };
      console.log(deposito);

      this.dashSvc.postDeposito(deposito, this.accessToken).subscribe(
        (response) => {
          console.log('Risposta dal server:', response);
          this.descrizione = '';
          this.loading = false;
          this.togglePrenotazione = false;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error("Errore durante l'invio della prenotazione", error);
          this.loading = false;
        }
      );
    }, 2000);
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
