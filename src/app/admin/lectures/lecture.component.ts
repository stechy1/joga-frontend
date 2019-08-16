import { Component, OnInit } from '@angular/core';
import { LectureService } from './lecture.service';
import { DayAction } from '../../share/calendar/day-action';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {

  dayActions = new BehaviorSubject<DayAction[]>([]);
  viewDate: Date;

  constructor(private _calendarService: LectureService) { }

  ngOnInit() {}

  changeViewDate(date: Date) {
    this._calendarService.all(date)
        .then(lectures => lectures.map(lecture => {
          const startTime = new Date(lecture.start_time * 1000);
          return {
            id: lecture.id,
            dayIndex: startTime.getDate(),
            name: lecture.lecture_name,
            timeStart: startTime,
            duration: lecture.duration,
            reserved: lecture.reserved_clients,
            capacity: lecture.max_persons
            } as DayAction;
        }))
        .then(dayActions => this.dayActions.next(dayActions))
        .catch(reason =>  console.error(reason));
  }
}
