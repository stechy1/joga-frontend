import { Injectable } from '@angular/core';
import { BASE_GENERAL_API, LectureType } from './general.share';
import { HttpClient } from '@angular/common/http';
import { Lecture } from '../share/lecture';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private static readonly GET_SERVICES = `${BASE_GENERAL_API}/services`;
  private static readonly GET_LECTURES = `${BASE_GENERAL_API}/lectures`;
  private static readonly GET_CAROUSEL = `${BASE_GENERAL_API}/carousel`;

  constructor(private _http: HttpClient) { }

  lectureTypes(): Promise<LectureType[]> {
    return this._http.get<{lectureTypes: LectureType[]}>(GeneralService.GET_SERVICES)
               .toPromise()
               .then(response => {
                 return response.lectureTypes;
               });
  }

  lectures(date: Date): Promise<Lecture[]> {
    const dateTime = `${date.getTime()}`.substr(0, 10);
    return this._http.get<{lectures: Lecture[]}>(`${GeneralService.GET_LECTURES}/${dateTime}`)
               .toPromise()
               .then(response => {
                 return response.lectures;
               });
  }

  carousel(): Promise<any[]> {
    return this._http.get<{carousel: any[]}>(GeneralService.GET_CAROUSEL)
               .toPromise()
               .then(response => {
                 return response.carousel;
               });
  }
}
