import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CardComponent} from './card/card.component';
import { TableComponent } from './table/table.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WindowComponent } from './calendar/window/window.component';
import { MonthYearTitlePipe } from './calendar/month-year-title.pipe';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmDialogComponent } from './modal/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    CarouselComponent,
    CalendarComponent,
    WindowComponent,
    MonthYearTitlePipe,
    PaginatorComponent,
    ModalComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardComponent,
    TableComponent,
    CarouselComponent,
    CalendarComponent,
    PaginatorComponent,
    ModalComponent,
    ConfirmDialogComponent
  ]
})
export class ShareModule {

}
