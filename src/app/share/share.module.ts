import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CardComponent} from './card/card.component';
import { TableComponent } from './table/table.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WindowComponent } from './calendar/window/window.component';
import { MonthYearTitlePipe } from './calendar/month-year-title.pipe';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    CarouselComponent,
    CalendarComponent,
    WindowComponent,
    MonthYearTitlePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    TableComponent,
    CarouselComponent,
    CalendarComponent
  ]
})
export class ShareModule {

}
