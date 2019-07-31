import { Component, OnInit } from '@angular/core';
import { CalendarDay } from './day';
import { Days, getDaysInMonth, getDaysInPrevMonth, getFirstDayOffset, Months } from './calendar.utils';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private static readonly TOTAL_WINDOWS = 42;
  private static readonly TODAY = new Date();

  days: string[] = Days.getShortNames();
  windows: CalendarDay[] = [];
  private _viewDate$ = new BehaviorSubject<Date>(CalendarComponent.TODAY);

  constructor() {

  }

  ngOnInit() {
    this._viewDate$.subscribe((date: Date) => this._renderCalendar(date));
  }

  private _renderCalendar(date: Date) {
    this.windows.splice(0);

    const firstDayOffset = getFirstDayOffset(date);
    const todayDays = getDaysInMonth(date);
    let index = -firstDayOffset;

    const prevMonthDays = getDaysInPrevMonth(date);
    for (; index < 0; index++) {
      this.windows.push(new CalendarDay(prevMonthDays + index, false));
    }

    for (let dayIndex = 1; index < todayDays; index++, dayIndex++) {
      this.windows.push(new CalendarDay(dayIndex));
    }

    for (let dayIndex = 1; index < CalendarComponent.TOTAL_WINDOWS - firstDayOffset; index++, dayIndex++) {
      this.windows.push(new CalendarDay(dayIndex, false));
    }
  }

  handleShowPrevMonth() {
    this._viewDate$.next(Months.getPrevMonth(this._viewDate$.getValue()));
  }

  handleShowNextMonth() {
    this._viewDate$.next(Months.getNextMonth(this._viewDate$.getValue()));
  }

  get viewDate(): Observable<Date> {
    return this._viewDate$;
  }
}
