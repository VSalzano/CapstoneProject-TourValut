import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GruppoLocker } from '../Models/GruppoLocker';
import { Observable, catchError } from 'rxjs';
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

  getAllDepositi() {
    return this.http.get(this.depositoEndpoint);
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

  postDeposito(deposito: Deposito, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const options = { headers: headers, responseType: 'text' as 'json' }; // Imposta responseType su 'text'

    return this.http.post<any>(`${this.depositoEndpoint}`, deposito, options);
  }

  updateUser(id: number, user: any, accessToken: string): Observable<string> {
    const url = `${this.usersEndpoint}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }),
    };

    return this.http
      .put<string>(url, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<string> {
    console.error('Errore nella richiesta:', error);
    return new Observable<string>((observer) => {
      observer.next('Si è verificato un errore durante la richiesta.');
      observer.complete();
    });
  }

  terminaDeposito(
    codicePrenotazione: string,
    accessToken: string
  ): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.post<string>(
      `${this.depositoEndpoint}/termina?codicePrenotazione=${codicePrenotazione}`,
      null,
      { headers, responseType: 'text' as 'json' }
    );
  }
}
