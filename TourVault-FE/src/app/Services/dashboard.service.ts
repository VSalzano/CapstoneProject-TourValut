import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GruppoLocker } from '../Models/GruppoLocker';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { AuthService } from './auth.service';
import { Deposito } from '../Models/Deposito';
import { Locker } from '../Models/locker';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  gruppiEndpoint: string = 'http://localhost:8080/api/gruppi-locker';
  usersEndpoint: string = 'http://localhost:8080/api/users';
  depositoEndpoint: string = 'http://localhost:8080/api/depositi';
  lockersEndpoint: string = 'http://localhost:8080/api/lockers';

  constructor(private http: HttpClient) {}

  getAllGruppi() {
    return this.http.get(this.gruppiEndpoint);
  }

  getGruppoById(id: number): Observable<GruppoLocker> {
    return this.http.get<GruppoLocker>(`${this.gruppiEndpoint}/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersEndpoint}/${id}`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.usersEndpoint}/username/${username}`);
  }

  getLockerById(id: number): Observable<Locker> {
    return this.http.get<Locker>(`${this.lockersEndpoint}/${id}`);
  }

  postDeposito(deposito: Deposito, accessToken: string): Observable<Deposito> {
    // Crea le intestazioni e aggiungi l'access token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    // Imposta le intestazioni nella richiesta HTTP
    const options = { headers: headers };
    return this.http.post<Deposito>(
      `${this.depositoEndpoint}`,
      deposito,
      options
    );
  }
}
