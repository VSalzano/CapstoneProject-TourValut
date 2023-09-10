import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Pages/auth/auth.component';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { LoginComponent } from './Pages/auth/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./Pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full',
  },
  { path: 'dashboard', loadChildren: () => import('./Pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
