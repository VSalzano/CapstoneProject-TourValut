import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DettagliogruppoComponent } from './dettagliogruppo/dettagliogruppo.component';
import { AreautenteComponent } from './areautente/areautente.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dettagliogruppo/:id', component: DettagliogruppoComponent },
  { path: 'areautente/:id', component: AreautenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
