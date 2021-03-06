import { NgModule } from '@angular/core';

import { GeneralRoutingModule } from './general-routing.module';

import { GeneralComponent } from './general.component';

import { IntroComponent } from './fragments/intro/intro.component';
import { InformationComponent } from './fragments/information/information.component';
import { CalendarComponent } from './fragments/calendar/calendar.component';
import { ContactComponent } from './fragments/contact/contact.component';
import { ShareModule } from '../share/share.module';
import { ServicesComponent } from './fragments/services/services.component';
import { LectureTypeComponent } from './lecture-type/lecture-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LecturesService } from './fragments/calendar/lectures.service';

@NgModule({
  declarations: [
    GeneralComponent,
    // AccountComponent,

    // Portfolio components
    IntroComponent,
    InformationComponent,
    CalendarComponent,
    ContactComponent,
    ServicesComponent,
    LectureTypeComponent
  ],
  imports: [
    GeneralRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  providers: [LecturesService]
})
export class GeneralModule {

}
