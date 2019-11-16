import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_ACCOUNT_API } from '../account.share';
import { DayAction } from '../../share/calendar/day-action';
import { Lecture } from '../../share/lecture';

@Injectable()
export class LecturesService {

  private static readonly ACCESS_POINT = `${BASE_ACCOUNT_API}/lectures`;
  private static readonly MY_LECTURES = `${LecturesService.ACCESS_POINT}/my_lectures`;
  private static readonly ASSIGN_LECTURE = `${LecturesService.ACCESS_POINT}/assign`;
  private static readonly CANCEL_LECTURE = `${LecturesService.ACCESS_POINT}/cancel`;

  constructor(private _http: HttpClient) {
  }

  myLectures(): Promise<Lecture[]> {
    return this._http.get<{lectures: Lecture[]}>(`${LecturesService.MY_LECTURES}`)
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

  public cancel(dayAction: DayAction): Promise<DayAction> {
    return this._http.delete(`${LecturesService.CANCEL_LECTURE}/${dayAction.id}`).toPromise()
        .then(() => {
          dayAction.assigned = false;
          dayAction.reserved--;
          return dayAction;
        });
  }
}
