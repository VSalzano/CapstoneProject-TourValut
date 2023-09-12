import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from 'src/app/Components/Components/navbar/navbar.component';
import { DettagliogruppoComponent } from './dettagliogruppo/dettagliogruppo.component';

@NgModule({
  declarations: [DashboardComponent, DettagliogruppoComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
