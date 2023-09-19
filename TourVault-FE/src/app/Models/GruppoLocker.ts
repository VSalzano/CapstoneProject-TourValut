import { Locker } from './locker';

export class GruppoLocker {
  id?: number;
  nome: string;
  posizione: string;
  urlImmagine: string;
  locker: Locker[];
  stato: string;

  constructor(
    nome: string,
    posizione: string,
    locker: Locker[],
    urlImmagine: string,
    stato: string
  ) {
    this.nome = nome;
    this.posizione = posizione;
    this.urlImmagine = urlImmagine;
    this.locker = locker;
    this.stato = stato;
  }
}
