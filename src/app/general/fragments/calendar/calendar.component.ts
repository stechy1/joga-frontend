import { Component, OnInit } from '@angular/core';
import { DayAction } from '../../../share/calendar/day-action';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from '../../general.service';
import { mapLectureToDayAction } from '../../../share/general-utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dayActions: BehaviorSubject<DayAction[]> = new BehaviorSubject<DayAction[]>([]);

  constructor(private _service: GeneralService) { }

  ngOnInit() {

  }

  changeViewDate(date: Date) {
    this._service.lectures(date)
        .then(lectures => {
          const dayActions = lectures.map(lecture => mapLectureToDayAction(lecture));
          this.dayActions.next(dayActions);
        });
  }
}
