import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminGuard } from './admin.guard';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {

}
