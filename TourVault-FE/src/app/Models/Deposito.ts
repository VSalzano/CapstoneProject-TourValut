import { User } from './User';
import { Locker } from './locker';

export class Deposito {
  id?: number;
  user: User;
  locker: Locker;
  dataOraInizio: string;
  stato: string;
  descrizione: string;

  constructor(
    user: User,
    locker: Locker,
    dataOraInizio: string,
    descrizione: string,
    stato: string,
    id?: any
  ) {
    this.user = user;
    this.locker = locker;
    this.dataOraInizio = dataOraInizio;
    this.descrizione = descrizione;
    this.stato = stato;
    this.id = id;
  }
}
