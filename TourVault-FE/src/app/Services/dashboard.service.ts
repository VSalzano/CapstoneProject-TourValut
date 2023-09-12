import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GruppoLocker } from '../Models/GruppoLocker';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  gruppiEndpoint: string = 'http://localhost:8080/api/gruppi-locker';

  constructor(private http: HttpClient) {}

  getAllGruppi() {
    return this.http.get(this.gruppiEndpoint);
  }

  getGruppoById(id: number): Observable<GruppoLocker> {
    return this.http.get<GruppoLocker>(`${this.gruppiEndpoint}/${id}`);
  }
}
