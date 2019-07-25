import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from '../day';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  @Input() calendarDay: CalendarDay;

  constructor() { }

  ngOnInit() {
  }

}
