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
    return this._http.get<{lectures: Lecture[]}>(`${LectureService.ACCESS_POINT}/${date.getTime()}`)
               .toPromise()
               .then(response => response.lectures);
  }

  allTrainers(): Promise<Trainer[]> {
    return this._http.get<{trainers: Trainer[]}>(LectureService.GET_TRAINERS)
               .toPromise()
               .then(result => {
                 return result.trainers
               });
  }

  insert(lecture: Lecture): Promise<any> {
    console.log(new Date(lecture.start_time));
    console.log(new Date(lecture.start_time).getTime());
    const formData = new FormData();
    formData.append('trainer', `${lecture.trainer}`);
    formData.append('start_time', `${new Date(lecture.start_time).getTime()}`);
    formData.append('duration', `${lecture.duration}`);
    formData.append('max_persons', `${lecture.max_persons}`);
    formData.append('place', lecture.place);

    return this._http.post(LectureService.ACCESS_POINT, formData)
               .toPromise();
  }
}
