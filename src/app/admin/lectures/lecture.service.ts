import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_ADMIN_API } from '../admin.share';
import { Lecture } from '../../share/lecture';
import { Trainer } from './trainer';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeServiceEvent } from '../../share/change-service-event';
import { CRUDServiceType } from '../../share/crud-service-type';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'lectures';
  private static readonly GET_LECTURE_BY_ID = `${LectureService.ACCESS_POINT}/id`;
  private static readonly UPDATE_LECTURE = `${LectureService.ACCESS_POINT}/update`;
  private static readonly GET_TRAINERS = `${LectureService.ACCESS_POINT}/trainers`;
  private static readonly GET_TIME_VALIDITY = `${LectureService.ACCESS_POINT}/time_validity`;
  public static readonly TIME_START_VALIDITY = `time_start`;
  public static readonly TIME_END_VALIDITY = `time_end`;
  private static readonly GET_DURATION_VALIDITY = `${LectureService.ACCESS_POINT}/duration_validity`;

  private readonly lectures$: BehaviorSubject<Lecture[]> = new BehaviorSubject<Lecture[]>([]);

  constructor(private _http: HttpClient) { }

  private _changeServiceEventHandler(event: ChangeServiceEvent<Lecture>) {
    if (event === null) {
      return;
    }

    const lecture = event.record;
    const lectures = this.lectures$.getValue();
    const lectureIndex = lectures.findIndex(value => value.lecture_id === lecture.lecture_id);
    switch (event.changeType) {
      case CRUDServiceType.INSERT:
        if (lectureIndex !== -1) {
          console.error(`Lekce s ID: ${lectureIndex} již existuje!`);
          return;
        }

        lectures.push(lecture);
        break;
      case CRUDServiceType.UPDATE:
        if (lectureIndex === -1) {
          console.error(`Lekce s ID: ${lectureIndex} nebyla nalezena!`);
          return;
        }

        lectures[lectureIndex] = lecture;
        break;
      case CRUDServiceType.DELETE:
        if (lectureIndex === -1) {
          console.error(`Lekce s ID: ${lectureIndex} nebyla nalezena!`);
          return;
        }

        lectures.splice(lectureIndex, 1);
        break;
    }
    this.lectures$.next(lectures);
  }

  all(date: Date): void {
    const dateTime = `${date.getTime()}`.substr(0, 10);
    this._http.get<{lectures: Lecture[]}>(`${LectureService.ACCESS_POINT}/${dateTime}`)
               .toPromise()
               .then(response => {
                 this.lectures$.next(response.lectures);
               });
  }

  allTrainers(): Promise<Trainer[]> {
    return this._http.get<{trainers: Trainer[]}>(LectureService.GET_TRAINERS)
               .toPromise()
               .then(result => {
                 return result.trainers;
               });
  }

  byId(lectureId: number): Promise<Lecture> {
    const url = `${LectureService.GET_LECTURE_BY_ID}/${lectureId}`;

    return this._http.get<{lecture: Lecture}>(url)
               .toPromise()
               .then(result => {
                 return result.lecture;
               });
  }

  insert(lecture: Lecture): Promise<Lecture> {
    const formData = new FormData();

    const dateTimeStart = new Date(lecture.time_start);
    const dateTimeEnd = new Date(lecture.time_end);
    dateTimeStart.setMonth(dateTimeStart.getMonth() + 1);
    dateTimeEnd.setMonth(dateTimeEnd.getMonth() + 1);

    formData.append('trainer', `${lecture.trainer_id}`);
    formData.append('time_start', `${dateTimeStart.getTime()}`.substr(0, 10));
    formData.append('time_end', `${dateTimeEnd.getTime()}`.substr(0, 10));
    formData.append('max_persons', `${lecture.max_persons}`);
    formData.append('place', lecture.place);
    formData.append('type', `${lecture.type}`);

    return this._http.post<{lecture: Lecture}>(LectureService.ACCESS_POINT, formData)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.lecture,
                   changeType: CRUDServiceType.INSERT
                 });

                 return result.lecture;
               });
  }

  update(lecture: Lecture): Promise<Lecture> {
    const formData = new FormData();

    const dateTimeStart = new Date(lecture.time_start);
    const dateTimeEnd = new Date(lecture.time_end);
    dateTimeStart.setMonth(dateTimeStart.getMonth() + 1);
    dateTimeEnd.setMonth(dateTimeEnd.getMonth() + 1);

    formData.append('id', `${lecture.lecture_id}`);
    formData.append('trainer', `${lecture.trainer_id}`);
    formData.append('time_start', `${dateTimeStart.getTime()}`.substr(0, 10));
    formData.append('time_end', `${dateTimeEnd.getTime()}`.substr(0, 10));
    formData.append('max_persons', `${lecture.max_persons}`);
    formData.append('place', lecture.place);
    formData.append('type', `${lecture.type}`);

    return this._http.post<{lecture: Lecture}>(LectureService.UPDATE_LECTURE, formData)
               .toPromise()
               .then((result) => {
                 this._changeServiceEventHandler({
                   record: result.lecture,
                   changeType: CRUDServiceType.UPDATE
                 });
                 return result.lecture;
               });
  }

  delete(lectureId: number): Promise<Lecture> {
    return this._http.delete<{lecture: Lecture}>(`${LectureService.ACCESS_POINT}/${lectureId}`)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.lecture,
                   changeType: CRUDServiceType.DELETE
                 });
                 return result.lecture;
               });
  }

  checkDateValidity(dateRaw: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      resolve(true);
    });
    // const date = new Date(dateRaw);
    // date.setHours(0, 0, 0, 0);
    // const dateTime = `${date.getTime()}`.substr(0, 10);
    // return this._http.get<{valid: boolean}>(`${LectureService.GET_DATE_TIME_VALIDITY}/${dateTime}`)
    //            .toPromise()
    //            .then(result => {
    //              return result.valid;
    //            });
  }

  checkDurationValidity(dateTimeRaw: string, duration: string): Promise<boolean> {
    const dateTime = `${new Date(dateTimeRaw).getTime()}`.substr(0, 10);
    return this._http.get<{valid: boolean}>(`${LectureService.GET_DURATION_VALIDITY}/${dateTime}/${duration}`)
               .toPromise()
               .then(result => {
                 return result.valid;
               });
  }

  checkTimeValidity(timePart: string, day: string, time: string, lectureId?: number): Promise<boolean> {
    const dateTime = new Date(`${day} ${time}`);
    dateTime.setMonth(dateTime.getMonth() + 1);
    const dateTimeRaw = `${dateTime.getTime()}`.substr(0, 10);
    return this._http.get<{valid: boolean}>(`${LectureService.GET_TIME_VALIDITY}/${timePart}/${dateTimeRaw}/${lectureId}`)
               .toPromise()
               .then(result => {
                 return result.valid;
               });
  }

  get lectures(): Observable<Lecture[]> {
    return this.lectures$;
  }
}
