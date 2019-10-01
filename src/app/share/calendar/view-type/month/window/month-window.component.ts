import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarDay } from '../../../day';

@Component({
  selector: 'app-month-window',
  templateUrl: './month-window.component.html',
  styleUrls: ['./month-window.component.css']
})
export class MonthWindowComponent implements OnInit {

  @Input() calendarDay: CalendarDay;
  @Output() showSchedule = new EventEmitter<CalendarDay>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (this.calendarDay.highlight) {
      this.showSchedule.next(this.calendarDay);
    }
  }
}
