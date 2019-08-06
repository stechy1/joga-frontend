import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ShareModule} from '../share/share.module';
import { CalendarComponent } from './calendar/calendar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ClientsComponent } from './clients/clients.component';
import { CalendarNewComponent } from './calendar/new/calendar-new.component';
import { AuthModule } from '../auth/auth.module';
import { UploadComponent } from './carousel/upload/upload.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CalendarComponent,
    SidebarComponent,
    CarouselComponent,
    ClientsComponent,
    CalendarNewComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    AdminRoutingModule,
    AuthModule,
    ReactiveFormsModule
  ],
  exports: [

  ]
})
export class AdminModule {

}
