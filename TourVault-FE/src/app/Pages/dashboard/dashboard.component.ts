import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GruppoLocker } from 'src/app/Models/GruppoLocker';
import { AuthService } from 'src/app/Services/auth.service';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  gruppiLocker: GruppoLocker[] = [];

  constructor(
    private router: Router,
    private dashSvc: DashboardService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.dashSvc.getAllGruppi().subscribe((data: any) => {
      this.gruppiLocker = data;
      console.log(this.gruppiLocker);
    });
  }
}
