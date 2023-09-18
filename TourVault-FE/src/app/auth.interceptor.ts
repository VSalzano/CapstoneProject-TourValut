import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Ottieni l'access token dal Local Storage
    const accessToken = localStorage.getItem('user.accessToken');

    // Verifica se l'access token è presente
    if (accessToken) {
      // Aggiungi l'access token alle intestazioni della richiesta
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Inoltra la richiesta modificata
      return next.handle(authRequest);
    } else {
      // Se l'access token non è presente, continua semplicemente con la richiesta originale
      return next.handle(request);
    }
  }
}
