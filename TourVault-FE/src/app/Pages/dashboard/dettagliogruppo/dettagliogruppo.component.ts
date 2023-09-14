import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Deposito } from 'src/app/Models/Deposito';
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
    private route: ActivatedRoute,
    private modalService: NgbModal
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
