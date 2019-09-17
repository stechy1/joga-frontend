import { Injectable } from '@angular/core';
import { BASE_GENERAL_API, LectureType } from '../../general.share';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private static readonly GET_SERVICES = `${BASE_GENERAL_API}/services`;

  constructor(private _http: HttpClient) { }

  lectureTypes(): Promise<LectureType[]> {
    return this._http.get<{lectureTypes: LectureType[]}>(ServicesService.GET_SERVICES)
               .toPromise()
               .then(response => {
                 return response.lectureTypes;
               });
  }
}
