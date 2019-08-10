import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminComponent } from './admin.component';
import { ClientsComponent } from './clients/clients.component';
import { CalendarNewComponent } from './calendar/new/calendar-new.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MyComponent } from './my/my.component';

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
        path: 'my',
        component: MyComponent,
        outlet: 'subpage'
      },
      {
        path: 'calendar',
        outlet: 'subpage',
        children: [
          {
            path: '',
            component: CalendarComponent,
            pathMatch: 'full'
          },
          {
            path: 'new',
            component: CalendarNewComponent
          },
          {
            path: ':id',
            component: CalendarComponent
          }
        ]
      },
      {
        path: 'carousel',
        component: CarouselComponent,
        outlet: 'subpage'
      },
      {
        path: 'clients',
        component: ClientsComponent,
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
