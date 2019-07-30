import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminComponent } from './admin.component';

// import { AdminGuard } from './admin.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'x'
  },
  {
    path: 'x',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        outlet: 'subpage'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        outlet: 'subpage'
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        outlet: 'subpage'
      }
    ]
  },

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
