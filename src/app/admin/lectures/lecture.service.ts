import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_ADMIN_API } from '../admin.share';
import { Lecture } from './lecture';
import { Trainer } from './trainer';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LectureChangeEvent, LectureChangeType } from './lecture-change-event';

export interface LectureType {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'lectures';
  private static readonly GET_LECTURE_BY_ID = `${LectureService.ACCESS_POINT}/id`;
  private static readonly UPDATE_LECTURE = `${LectureService.ACCESS_POINT}/update`;
  private static readonly GET_TRAINERS = `${LectureService.ACCESS_POINT}/trainers`;
  private static readonly GET_LECTURE_TYPES = `${LectureService.ACCESS_POINT}/lecture_types`;
  private static readonly GET_DATE_TIME_VALIDITY = `${LectureService.ACCESS_POINT}/date_time_validity`;
  private static readonly GET_DURATION_VALIDITY = `${LectureService.ACCESS_POINT}/duration_validity`;

  private readonly _lectureChangeEmmiter = new BehaviorSubject<LectureChangeEvent>(null);

  constructor(private _http: HttpClient) { }

  all(date: Date): Promise<Lecture[]> {
    const dateTime = `${date.getTime()}`.substr(0, 10);
    return this._http.get<{lectures: Lecture[]}>(`${LectureService.ACCESS_POINT}/${dateTime}`)
               .toPromise()
               .then(response => {
                 console.log(response.lectures);
                 return response.lectures;
               });
  }

  allTrainers(): Promise<Trainer[]> {
    return this._http.get<{trainers: Trainer[]}>(LectureService.GET_TRAINERS)
               .toPromise()
               .then(result => {
                 return result.trainers;
               });
  }

  allLectureTypes(): Promise<LectureType[]> {
    return this._http.get<{lectureTypes: LectureType[]}>(LectureService.GET_LECTURE_TYPES)
               .toPromise()
               .then(result => {
                 return result.lectureTypes;
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
                 this._lectureChangeEmmiter.next({
                   lecture: result.lecture,
                   changeType: LectureChangeType.INSERT
                 });
                 return result.lecture;
               });
  }

  get lectureChangeEmmiter(): Observable<LectureChangeEvent> {
    return this._lectureChangeEmmiter;
  }

  byId(lectureId: number): Promise<Lecture> {
    const url = `${LectureService.GET_LECTURE_BY_ID}/${lectureId}`;

    return this._http.get<{lecture: Lecture}>(url)
               .toPromise()
               .then(result => {
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
                 this._lectureChangeEmmiter.next({
                   lecture: result.lecture,
                   changeType: LectureChangeType.UPDATE
                 });
                 return result.lecture;
               });
  }

  delete(lectureId: number): Promise<Lecture> {
    return this._http.delete<{lecture: Lecture}>(`${LectureService.ACCESS_POINT}/${lectureId}`)
               .toPromise()
               .then(result => {
                 this._lectureChangeEmmiter.next({
                   lecture: result.lecture,
                   changeType: LectureChangeType.DELETE
                 });
                 return result.lecture;
               });
  }

  checkDateValidity(dateRaw: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      resolve(true);
    })
    // const date = new Date(dateRaw);
    // date.setHours(0, 0, 0, 0);
    // console.log(date);
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
}
