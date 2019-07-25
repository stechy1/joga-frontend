import { NgModule } from '@angular/core';

import { GeneralRoutingModule } from './general-routing.module';

import { GeneralComponent } from './general.component';
// import { AccountComponent } from './account/account.component';

import { IntroComponent } from './fragments/intro/intro.component';
import { InformationComponent } from './fragments/information/information.component';
import { CalendarComponent } from './fragments/calendar/calendar.component';
import { ContactComponent } from './fragments/contact/contact.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    GeneralComponent,
    // AccountComponent,

    // Portfolio components
    IntroComponent,
    InformationComponent,
    CalendarComponent,
    ContactComponent
  ],
  imports: [
    GeneralRoutingModule,
    ShareModule
  ],
})
export class GeneralModule {

}
