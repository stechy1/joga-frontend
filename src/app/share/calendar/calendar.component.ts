import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewType } from './calendar.utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { DayAction } from './day-action';
import { DayActionCrud } from './day-action-crud';

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  static readonly TODAY = new Date();

  @Input() dayActions: Observable<DayAction[]>;
  @Input() enableAdmin: boolean;
  @Input() enableUser: boolean;
  @Input() dayActionHandler: DayActionCrud;
  @Output() viewDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(CalendarComponent.TODAY);
  @Output() viewType$: BehaviorSubject<ViewType> = new BehaviorSubject<ViewType>(ViewType.MONTH);

  ViewType = ViewType;
  showPrev: EventEmitter<any> = new EventEmitter<any>();
  showNext: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  handleShowPrev() {
    this.showPrev.next();
  }

  handleShowNext() {
    this.showNext.next();
  }


  handleChangeViewDate(date: Date) {
    this.viewDate$.next(date);
  }

  get viewType(): ViewType {
    return this.viewType$.getValue();
  }
}
