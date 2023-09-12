import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/User';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-areautente',
  templateUrl: './areautente.component.html',
  styleUrls: ['./areautente.component.sass'],
})
export class AreautenteComponent {
  user: User = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    telefono: '',
    cittaResidenza: '',
    indirizzo: '',
    id: 0,
  };

  constructor(
    private dashSvc: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
}
