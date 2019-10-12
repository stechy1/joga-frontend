import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CardComponent} from './card/card.component';
import { TableComponent } from './table/table.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CalendarComponent } from './calendar/calendar.component';
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
import { MonthComponent } from './calendar/view-type/month/month.component';
import { WeekComponent } from './calendar/view-type/week/week.component';
import { AgendaComponent } from './calendar/view-type/agenda/agenda.component';
import { LectureTypePathPipe } from './lecture-type-path.pipe';
import { WeekWindowComponent } from './calendar/view-type/week/week-window/week-window.component';
import { MonthWindowComponent } from './calendar/view-type/month/window/month-window.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { EditorToolbarComponent } from './markdown-editor/editor-toolbar/editor-toolbar.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { ToolbarPositionPipe } from './markdown-editor/editor-toolbar/toolbar-position.pipe';

@NgModule({
  declarations: [
    CardComponent,
    TableComponent,
    CarouselComponent,
    CalendarComponent,
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
    InformDialogComponent,
    MonthComponent,
    MonthWindowComponent,
    WeekComponent,
    AgendaComponent,
    LectureTypePathPipe,
    WeekWindowComponent,
    MarkdownEditorComponent,
    EditorToolbarComponent,
    FileBrowserComponent,
    ToolbarPositionPipe
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
    LectureTypePathPipe,
    CurrentMaxValueComponent,
    MarkdownEditorComponent
  ],
  entryComponents: [
    DayScheduleComponent,
    ConfirmDialogComponent,
    InformDialogComponent,
    FileBrowserComponent
  ]
})
export class ShareModule {

}
