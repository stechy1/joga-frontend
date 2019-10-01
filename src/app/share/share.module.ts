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
import { ToggleComponent } from './toggle/toggle.component';
import { FormsModule } from '@angular/forms';
import { DialogChildsDirective } from './modal/dialog-childs.directive';
import { HeadingComponent } from './heading/heading.component';
import { DayScheduleComponent } from './calendar/day-schedule/day-schedule.component';
import { DayScheduleDirective } from './calendar/day-schedule.directive';
import { CurrentMaxValueComponent } from './current-max-value/current-max-value.component';
import { ConfirmDialogComponent } from './modal/confirm/confirm-dialog.component';
import { InformDialogComponent } from './modal/inform/inform-dialog.component';

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
    ToggleComponent,
    DialogChildsDirective,
    HeadingComponent,
    DayScheduleComponent,
    DayScheduleDirective,
    CurrentMaxValueComponent,
    ConfirmDialogComponent,
    InformDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    CardComponent,
    TableComponent,
    CarouselComponent,
    CalendarComponent,
    PaginatorComponent,
    ModalComponent,
    ToggleComponent,
    DialogChildsDirective,
    HeadingComponent,
    ConfirmDialogComponent,
    InformDialogComponent,
    CommonModule,
    LectureTypePathPipe
  ],
  entryComponents: [
    DayScheduleComponent,
    ConfirmDialogComponent,
    InformDialogComponent
  ]
})
export class ShareModule {

}
