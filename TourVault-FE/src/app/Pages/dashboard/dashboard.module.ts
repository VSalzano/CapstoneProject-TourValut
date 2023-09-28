import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DettagliogruppoComponent } from './dettagliogruppo/dettagliogruppo.component';
import { AreautenteComponent } from './areautente/areautente.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InfopageComponent } from './infopage/infopage.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DettagliogruppoComponent,
    AreautenteComponent,
    InfopageComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, NgbModalModule, FormsModule],
})
export class DashboardModule {}
