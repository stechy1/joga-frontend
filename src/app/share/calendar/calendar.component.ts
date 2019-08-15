import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CalendarDay } from './day';
import { Days, getDaysInMonth, getDaysInPrevMonth, getFirstDayOffset, Months } from './calendar.utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { DayScheduleDirective } from './day-schedule.directive';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { DayAction } from './day-action';

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  private static readonly TOTAL_WINDOWS = 42;
  private static readonly TODAY = new Date();
  private static readonly DAYS_IN_ROW = 7;

  @Input() dayActions: DayAction[] = [];
  @ViewChildren(DayScheduleDirective) directives: QueryList<DayScheduleDirective>;

  days: string[] = Days.getShortNames();
  windows: CalendarDay[] = [];
  rows = [0, 1, 2, 3, 4, 5, 6];

  private _viewDate$ = new BehaviorSubject<Date>(CalendarComponent.TODAY);
  private _directives: DayScheduleDirective[];
  private _oldRowIndex = -1;
  private _oldWindowIndex = -1;

  constructor() {

  }

  ngOnInit() {
    this._viewDate$.subscribe((date: Date) => this._renderCalendar(date));
  }

  ngAfterViewInit(): void {
    this._directives = this.directives.toArray();

    // setTimeout(() => {
    //   this._viewDate$.next(CalendarComponent.TODAY);
    // }, 500);
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
      const day = new CalendarDay(dayIndex);
      const dayActions = this.dayActions.filter(action => action.dayIndex === dayIndex);
      dayActions.forEach(action => day.addAction(action));
      this.windows.push(day);
    }

    for (let dayIndex = 1; index < CalendarComponent.TOTAL_WINDOWS - firstDayOffset; index++, dayIndex++) {
      this.windows.push(new CalendarDay(dayIndex, false));
    }
  }

  handleShowPrevMonth() {
    this._viewDate$.next(Months.getPrevMonth(this._viewDate$.getValue()));
  }

  handleShowNextMonth() {
    const date = Months.getNextMonth(this._viewDate$.getValue());
    console.log(date);
    this._viewDate$.next(date);
  }

  @Output() get viewDate(): Observable<Date> {
    return this._viewDate$;
  }

  getWindowInRow(row: number): CalendarDay[] {
    const from = row * CalendarComponent.DAYS_IN_ROW;
    return this.windows.slice(from, from + CalendarComponent.DAYS_IN_ROW);
  }

  handleWindowClick(row: number, window: CalendarDay) {
    // Pokud kliknu do stejného řádku
    if (this._oldRowIndex === row) {
      // A na stejný den
      if (this._oldWindowIndex === window.day) {
        // Schovám přehled akci
        this._directives[this._oldRowIndex].hideComponent();
        this._oldRowIndex = -1;
        this._oldWindowIndex = -1;
      } else {
        // Vyměním přehled akcí
        this._directives[this._oldRowIndex].changeDay(window);
        this._oldWindowIndex = window.day;
      }
      return;
    }

    if (this._oldRowIndex !== -1) {
      this._directives[this._oldRowIndex].hideComponent();
    }

    this._directives[row].showComponent(window);

    this._oldRowIndex = row;
    this._oldWindowIndex = window.day;
  }
}
