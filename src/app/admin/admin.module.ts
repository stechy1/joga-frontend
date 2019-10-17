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
import { LectureNewComponent } from './lectures/dialog/lecture-new.component';
import { AuthModule } from '../auth/auth.module';
import { ActiveImagesComponent } from './carousel/active-images/active-images.component';
import { FilterActivePipe } from './carousel/active-images/filter-active.pipe';
import { MyComponent } from './my/my.component';
import { LectureUpdateComponent } from './lectures/dialog/lecture-update.component';
import { LectureTypesComponent } from './lecture-types/lecture-types.component';
import { LectureTypesNewComponent } from './lecture-types/dialog/lecture-types-new.component';
import { LectureTypesUpdateComponent } from './lecture-types/dialog/lecture-types-update.component';
import { CarouselNewComponent } from './carousel/dialog/carousel-new.component';
import { CarouselUpdateComponent } from './carousel/dialog/carousel-update.component';
import { LectureDetailComponent } from './lectures/lecture-detail/lecture-detail.component';

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
    ActiveImagesComponent,
    FilterActivePipe,
    MyComponent,
    LectureTypesComponent,
    LectureTypesNewComponent,
    LectureTypesUpdateComponent,
    CarouselNewComponent,
    CarouselUpdateComponent,
    LectureDetailComponent,
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
    CarouselNewComponent,
    CarouselUpdateComponent,
    LectureNewComponent,
    LectureUpdateComponent,
    LectureTypesNewComponent,
    LectureTypesUpdateComponent,
  ]
})
export class AdminModule {

}
