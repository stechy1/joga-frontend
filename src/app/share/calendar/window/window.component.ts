import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarDay } from '../day';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

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
