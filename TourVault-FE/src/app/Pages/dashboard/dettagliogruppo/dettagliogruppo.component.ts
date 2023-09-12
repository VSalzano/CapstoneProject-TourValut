import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GruppoLocker } from 'src/app/Models/GruppoLocker';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dettagliogruppo',
  templateUrl: './dettagliogruppo.component.html',
  styleUrls: ['./dettagliogruppo.component.sass'],
})
export class DettagliogruppoComponent {
  gruppoLocker: GruppoLocker = {
    nome: '',
    posizione: '',
    locker: [],
    stato: '',
  };

  constructor(
    private dashSvc: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.dashSvc.getGruppoById(params.id).subscribe((data: GruppoLocker) => {
        this.gruppoLocker = data;
        console.log(data);
      });
    });
  }
}
