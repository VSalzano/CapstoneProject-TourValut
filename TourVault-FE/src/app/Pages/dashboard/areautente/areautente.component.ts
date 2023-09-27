import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullDeposito } from 'src/app/Models/FullDeposito';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/Services/auth.service';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-areautente',
  templateUrl: './areautente.component.html',
  styleUrls: ['./areautente.component.scss'],
})
export class AreautenteComponent {
  user!: User;
  prenotazioniUtente!: FullDeposito;
  elencoPrenotazioni: FullDeposito[] = [];

  loading: boolean = false;
  mostraEditArea: boolean = false;
  mostraTicket: boolean = false;
  accessToken: string = '';
  displayValue: string = '';
  showTastierino: boolean = false;

  constructor(
    private dashSvc: DashboardService,
    private route: ActivatedRoute,
    private authSvc: AuthService
  ) {
    this.recuperaAccessToken();
    this.route.params.subscribe((params: any) => {
      this.dashSvc.getUserById(params.id).subscribe((data: User) => {
        this.user = data;
        console.log(data);
        this.getDepositiUtente();
      });
    });
  }

  ngOnInit() {}

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

  toggleTicketArea(): void {
    this.mostraTicket = !this.mostraTicket;
    if (this.showTastierino) {
      this.showTastierino = false;
    }
  }

  getDepositiUtente() {
    this.dashSvc.getAllDepositi().subscribe((data: any) => {
      this.elencoPrenotazioni = data.filter(
        (deposito: FullDeposito) => deposito.user.id === this.user.id
      );
      console.log('Prenotazioni recuperate:', this.elencoPrenotazioni);
    });
  }

  addToDisplay(value: string) {
    this.displayValue += value;
  }

  clearDisplay() {
    this.displayValue = '';
  }

  sendData() {
    this.dashSvc.terminaDeposito(this.displayValue, this.accessToken).subscribe(
      (result) => {
        if (result.success) {
          console.log('Deposito terminato con successo!');
          window.location.reload();
        } else {
          console.error(
            'Errore durante la terminazione del deposito:',
            result.errorMessage
          );
        }
      },
      (error) => {
        console.error(
          'Si è verificato un errore durante la chiamata al servizio:',
          error
        );
        // window.location.reload();
      }
    );

    this.toggleTicketArea();
  }

  toggleTastierino() {
    this.showTastierino = !this.showTastierino;
  }
}
