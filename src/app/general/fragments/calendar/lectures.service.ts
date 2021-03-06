import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewType } from '../../../share/calendar/calendar.utils';
import { Lecture } from '../../../share/lecture';
import { DayAction } from '../../../share/calendar/day-action';
import { BASE_GENERAL_API } from '../../general.share';

@Injectable()
export class LecturesService {

  private static readonly ACCESS_POINT = `/api/account/lectures`;
  private static readonly ASSIGN_LECTURE = `${LecturesService.ACCESS_POINT}/assign`;
  private static readonly CANCEL_LECTURE = `${LecturesService.ACCESS_POINT}/cancel`;

  constructor(private _http: HttpClient) {
  }

  lectures(date: Date, viewType: ViewType): Promise<Lecture[]> {
    const dateTime = `${date.getTime()}`.substr(0, 10);
    return this._http.get<{lectures: Lecture[]}>(`${BASE_GENERAL_API}/${ViewType[viewType].toLowerCase()}/${dateTime}`)
               .toPromise()
               .then(response => {
                 return response.lectures;
               });
  }

  public assign(dayAction: DayAction): void {
    this._http.put(`${LecturesService.ASSIGN_LECTURE}/${dayAction.id}`, null).toPromise()
        .then(() => {
          dayAction.assigned = true;
          dayAction.reserved++;
        });
  }

  public cancel(dayAction: DayAction): void {
    this._http.delete(`${LecturesService.CANCEL_LECTURE}/${dayAction.id}`).toPromise()
        .then(() => {
          dayAction.assigned = false;
          dayAction.reserved--;
        });
  }
}
