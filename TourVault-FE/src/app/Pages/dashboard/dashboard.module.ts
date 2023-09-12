import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from 'src/app/Components/Components/navbar/navbar.component';
import { DettagliogruppoComponent } from './dettagliogruppo/dettagliogruppo.component';
import { AreautenteComponent } from './areautente/areautente.component';

@NgModule({
  declarations: [DashboardComponent, DettagliogruppoComponent, AreautenteComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
