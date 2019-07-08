import { NgModule } from '@angular/core';

import { GeneralRoutingModule } from './general-routing.module';

import { NavigationComponent } from './navigation/navigation.component';
import { GeneralComponent } from './general.component';

import { IntroComponent } from './intro/intro.component';
import { InformationComponent } from './information/information.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    NavigationComponent,
    GeneralComponent,

    // Portfolio components
    IntroComponent,
    InformationComponent,
    CalendarComponent,
    ContactComponent
  ],
  imports: [
    GeneralRoutingModule
  ],
  exports: [
    NavigationComponent,
    GeneralComponent
  ]
})
export class GeneralModule {

}

