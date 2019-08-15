import { Component, Input, OnInit } from '@angular/core';
import { DayAction } from '../day-action';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent implements OnInit {

  @Input() actions: DayAction[];

  constructor() { }

  ngOnInit() {
  }

}
