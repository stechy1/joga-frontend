import { Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DayAction } from '../../day-action';
import { DayActionCrud } from '../../day-action-crud';
import { Days, Months } from '../../calendar.utils';
import { CalendarComponent } from '../../calendar.component';

@Component({
  selector: 'app-calendar-view-type-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  @Input() dayActions: Observable<DayAction[]>;
  @Input() enableAdmin: boolean;
  @Input() enableUser: boolean;
  @Input() dayActionHandler: DayActionCrud;

  days: string[] = Days.getShortNames();

  private _viewDate$ = new BehaviorSubject<Date>(CalendarComponent.TODAY);

  constructor() { }

  ngOnInit() {
    this._viewDate$.subscribe((date: Date) => this._renderCalendar(date));
    this.dayActions.subscribe((actions => this._renderDayActions(actions)));
  }

  private _renderCalendar(date: Date) {

  }

  private _renderDayActions(actions: DayAction[]) {

  }

  @Output() get viewDate(): Observable<Date> {
    return this._viewDate$;
  }

  @Input() set showPrev(observable: Observable<any>) {
    observable.subscribe(() => {
      this._viewDate$.next(Months.getPrevMonth(this._viewDate$.getValue()));
    });
  }

  @Input() set showNext(observable: Observable<any>) {
    observable.subscribe(() => {
      this._viewDate$.next(Months.getNextMonth(this._viewDate$.getValue()));
    });
  }
}
