import { User } from './User';
import { Locker } from './locker';

export class Deposito {
  id: number;
  user: User;
  locker: Locker;
  dataOraInizio: Date;
  descrizione: string;
  dataOraFine: Date;
  stato: string;
  prezzoAffitto: number;
  codicePrenotazione: string;
  tariffaOraria: number;

  constructor(
    id: number,
    user: User,
    locker: Locker,
    dataOraInizio: Date,
    descrizione: string,
    dataOraFine: Date,
    stato: string,
    prezzoAffitto: number,
    codicePrenotazione: string,
    tariffaOraria: number
  ) {
    this.id = id;
    this.user = user;
    this.locker = locker;
    this.dataOraInizio = dataOraInizio;
    this.descrizione = descrizione;
    this.dataOraFine = dataOraFine;
    this.stato = stato;
    this.prezzoAffitto = prezzoAffitto;
    this.codicePrenotazione = codicePrenotazione;
    this.tariffaOraria = tariffaOraria;
  }
}
