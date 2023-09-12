export class User {
  id: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  telefono: string;
  cittaResidenza: string;
  indirizzo: string;

  constructor(
    id: number,
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    telefono: string,
    cittaResidenza: string,
    indirizzo: string
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.telefono = telefono;
    this.cittaResidenza = cittaResidenza;
    this.indirizzo = indirizzo;
  }
}
