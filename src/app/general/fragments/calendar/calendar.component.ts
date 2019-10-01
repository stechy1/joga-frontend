import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DayAction } from '../../../share/calendar/day-action';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralService } from '../../general.service';
import { mapLectureToDayAction } from '../../../share/general-utils';
import { ViewType } from '../../../share/calendar/calendar.utils';
import { DayActionCrud } from '../../../share/calendar/day-action-crud';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, DayActionCrud {

  dayActions: BehaviorSubject<DayAction[]> = new BehaviorSubject<DayAction[]>([]);

  private _viewType: ViewType = ViewType.MONTH;

  constructor(private _service: GeneralService) { }

  ngOnInit() {

  }


  changeViewDate(date: Date) {
    this._service.lectures(date, this._viewType)
        .then(lectures => {
          const dayActions = lectures.map(lecture => mapLectureToDayAction(lecture));
          this.dayActions.next(dayActions);
        });
  }

  handleChangeViewType(viewType: ViewType) {
    this._viewType = viewType;
  }

  // -------------- DayActionCrud implementation --------------

  assign(dayAction: DayAction): void {

  }

  cancel(dayAction: DayAction): void {

  }

}
