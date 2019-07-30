import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ShareModule} from '../share/share.module';
import { CalendarComponent } from './calendar/calendar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CalendarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    AdminRoutingModule
  ],
  exports: [

  ]
})
export class AdminModule {

}
