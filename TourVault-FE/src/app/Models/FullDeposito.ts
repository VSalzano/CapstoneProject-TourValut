import { User } from './User';
import { Locker } from './locker';

export class FullDeposito {
  id?: number;
  user: User;
  locker: Locker;
  dataOraInizio: string;
  descrizione: string;
  dataOraFine: string;
  stato: string;
  statoDeposito: string;
  prezzoAffitto: string;
  codicePrenotazione: string;
  tariffaOraria: number;

  constructor(
    user: User,
    locker: Locker,
    dataOraInizio: string,
    descrizione: string,
    dataOraFine: string,
    stato: string,
    statoDeposito: string,
    prezzoAffitto: string,
    codicePrenotazione: string,
    tariffaOraria: number,
    id?: number
  ) {
    this.user = user;
    this.locker = locker;
    this.dataOraInizio = dataOraInizio;
    this.dataOraFine = dataOraFine;
    this.descrizione = descrizione;
    this.stato = stato;
    this.statoDeposito = statoDeposito;
    this.prezzoAffitto = prezzoAffitto;
    this.codicePrenotazione = codicePrenotazione;
    this.tariffaOraria = tariffaOraria;
  }
}
