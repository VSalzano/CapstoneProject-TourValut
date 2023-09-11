export class Locker {
  id?: number;
  codiceIdentificativo: string;
  gruppo: number;
  stato: string;
  tipo: string;

  constructor(
    codiceIdentificativo: string,
    gruppo: number,
    stato: string,
    tipo: string
  ) {
    this.codiceIdentificativo = codiceIdentificativo;
    this.gruppo = gruppo;
    this.stato = stato;
    this.tipo = tipo;
  }
}
