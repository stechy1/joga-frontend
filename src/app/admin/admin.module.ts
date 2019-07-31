import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ShareModule} from '../share/share.module';
import { CalendarComponent } from './calendar/calendar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CalendarComponent,
    SidebarComponent,
    CarouselComponent
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
