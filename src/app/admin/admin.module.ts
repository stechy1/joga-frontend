import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShareModule } from '../share/share.module';
import { LectureComponent } from './lectures/lecture.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ClientsComponent } from './clients/clients.component';
import { LectureNewComponent } from './lectures/dialog/new/lecture-new.component';
import { LectureUpdateComponent } from './lectures/dialog/update/lecture-update.component';
import { AuthModule } from '../auth/auth.module';
import { UploadComponent } from './carousel/dialog/upload/upload.component';
import { UpdateComponent } from './carousel/dialog/update/update.component';
import { ActiveImagesComponent } from './carousel/active-images/active-images.component';
import { FilterActivePipe } from './carousel/active-images/filter-active.pipe';
import { MyComponent } from './my/my.component';
import { LectureDeleteComponent } from './lectures/dialog/delete/lecture-delete.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    LectureComponent,
    SidebarComponent,
    CarouselComponent,
    ClientsComponent,
    LectureNewComponent,
    LectureUpdateComponent,
    UploadComponent,
    UpdateComponent,
    ActiveImagesComponent,
    FilterActivePipe,
    MyComponent,
    LectureDeleteComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    AdminRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  entryComponents: [
    UploadComponent,
    UpdateComponent,
    LectureNewComponent,
    LectureUpdateComponent,
    LectureDeleteComponent
  ]
})
export class AdminModule {

}
