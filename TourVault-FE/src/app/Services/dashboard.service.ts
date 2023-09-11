import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  gruppiEndpoint: string = 'http://localhost:8080/api/gruppi-locker';

  constructor(private http: HttpClient) {}

  getAllGruppi() {
    return this.http.get(this.gruppiEndpoint);
  }
}
