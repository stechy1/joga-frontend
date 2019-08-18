import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_ADMIN_API } from '../admin.share';
import { Lecture } from './lecture';
import { Trainer } from './trainer';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'lectures';
  private static readonly GET_TRAINERS = `${LectureService.ACCESS_POINT}/trainers`;

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

  insert(lecture: Lecture): Promise<Lecture> {
    const formData = new FormData();
    const date = new Date(lecture.start_time);
    date.setMonth(date.getMonth() + 1);
    formData.append('trainer', `${lecture.trainer}`);
    formData.append('start_time', `${date.getTime()}`.substr(0, 10));
    formData.append('duration', `${lecture.duration}`);
    formData.append('max_persons', `${lecture.max_persons}`);
    formData.append('place', lecture.place);

    return this._http.post<{lecture: Lecture}>(LectureService.ACCESS_POINT, formData)
               .toPromise()
               .then(result => {
                 return result.lecture;
               });
  }
}
