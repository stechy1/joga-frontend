import { Component, OnInit } from '@angular/core';
import { LectureService } from './lecture.service';
import { DayAction } from '../../share/calendar/day-action';

@Component({
  selector: 'app-admin-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  dayActions: DayAction[] = [];
  viewDate: Date;

  constructor(private _calendarService: LectureService) { }

  ngOnInit() {

  }

  check() {
    // this._calendarService.all(new Date())
    //     .then(value => console.log(value))
    //     .catch(reason =>  console.error(reason));
  }

  changeViewDate(date: Date) {
    this._calendarService.all(date)
        .then(lectures => lectures.map(lecture => {
          const date = new Date(lecture.start_time);
          return new DayAction(1, date.getDay(), "", date, lecture.duration, lecture.max_persons, 0)
        }))
        .then(dayActions => this.dayActions = dayActions)
        .catch(reason =>  console.error(reason));
  }
}
