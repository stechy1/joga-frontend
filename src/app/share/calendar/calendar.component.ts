import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CalendarDay } from './day';
import { Days, getDaysInMonth, getDaysInPrevMonth, getFirstDayOffset, Months } from './calendar.utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { DayScheduleDirective } from './day-schedule.directive';
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

  @Input() dayActions: Observable<DayAction[]>;
  @Input() enableAdmin: boolean;
  @Input() enableUser: boolean;
  @ViewChildren(DayScheduleDirective) directives: QueryList<DayScheduleDirective>;

  @Output() newDayAction: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() updateDayAction: EventEmitter<DayAction> = new EventEmitter<DayAction>();
  @Output() deleteDayAction: EventEmitter<DayAction> = new EventEmitter<DayAction>();

  days: string[] = Days.getShortNames();
  windows: CalendarDay[] = [];
  rows = [0, 1, 2, 3, 4, 5, 6];

  private _viewDate$ = new BehaviorSubject<Date>(CalendarComponent.TODAY);
  private _directives: DayScheduleDirective[];
  private _oldRowIndex = -1;
  private _oldWindowIndex = -1;
  private _curentCalendarDayOffset = -1;

  constructor() {}

  ngOnInit() {
    this._viewDate$.subscribe((date: Date) => this._renderCalendar(date));
    this.dayActions.subscribe((actions => this._renderDayActions(actions)));
  }

  ngAfterViewInit(): void {
    this._directives = this.directives.toArray();
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

    this._curentCalendarDayOffset = firstDayOffset - 1;
    for (let dayIndex = 1; index < todayDays; index++, dayIndex++) {
      const day = new CalendarDay(dayIndex);
      this.windows.push(day);
    }

    for (let dayIndex = 1; index < CalendarComponent.TOTAL_WINDOWS - firstDayOffset; index++, dayIndex++) {
      this.windows.push(new CalendarDay(dayIndex, false));
    }
  }

  private _renderDayActions(dayActions: DayAction[]) {
    this.windows.forEach(window => {
      window.clearActions();
    });
    dayActions.forEach(action => {
      this.windows[this._curentCalendarDayOffset + action.dayIndex].addAction(action);
    });
  }

  private _hideDayAgenda() {
    if (this._oldRowIndex === -1) {
      return;
    }

    const firstDayOffset = getFirstDayOffset(this._viewDate$.getValue());

    this.handleWindowClick(this._oldRowIndex, this.windows[firstDayOffset - 1 + this._oldWindowIndex]);
    this._oldWindowIndex = -1;
    this._oldRowIndex = -1;
  }

  handleShowPrevMonth() {
    this._hideDayAgenda();
    this._viewDate$.next(Months.getPrevMonth(this._viewDate$.getValue()));
  }

  handleShowNextMonth() {
    this._hideDayAgenda();
    this._viewDate$.next(Months.getNextMonth(this._viewDate$.getValue()));
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

  handleNewDayAction(calendarDay: CalendarDay) {
    const viewDate = new Date(this._viewDate$.getValue());
    viewDate.setDate(calendarDay.day);
    viewDate.setHours(8, 0, 0, 0);
    this.newDayAction.next(viewDate);
  }

  handleUpdateDayAction(dayAction: DayAction) {
    this.updateDayAction.next(dayAction);
  }

  handleDeleteDayAction(dayAction: DayAction) {
    this.deleteDayAction.next(dayAction);
  }
}
