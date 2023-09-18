import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, tap } from 'rxjs';
import { IRegister } from '../Models/iregister';
import { ILogin } from '../Models/ilogin';
import { Role } from '../Models/Role.enum';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  private authSubject = new BehaviorSubject<null | Object>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((data) => Boolean(data)));

  registerEndpoint: string = 'http://localhost:8080/api/auth/register';
  loginEndpoint: string = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  register(user: IRegister) {
    return this.http.post(this.registerEndpoint, {
      ...user,
    });
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('user');
    console.log('Utente Sloggato');
    this.router.navigate(['/auth']);
  }

  login(user: ILogin) {
    return this.http
      .post(this.loginEndpoint, { ...user, returnSecuretoken: true })
      .pipe(
        tap((data) => {
          this.authSubject.next(data);
          localStorage.setItem('user', JSON.stringify(data));
        })
      );
  }

  isUserAdmin(): boolean {
    const storageUser = JSON.parse(localStorage.getItem('user')!);
    if (storageUser) {
      let decodedToken = this.jwtHelper.decodeToken(storageUser.accessToken);
      return decodedToken.role[0].roleName == Role.ADMIN;
    }
    return false;
  }

  getLoggedUserId(): number {
    const storageUser = JSON.parse(localStorage.getItem('user')!);
    let decoder = this.jwtHelper.decodeToken(storageUser.accessToken);
    return parseInt(decoder.id);
  }

  restoreUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(user.accessToken)) {
      return;
    }

    // Rimani sulla rotta corrente invece di reindirizzare a '/dashboard'
    this.authSubject.next(user);
  }
}
