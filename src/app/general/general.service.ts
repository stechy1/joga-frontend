import { Injectable } from '@angular/core';
import { BASE_GENERAL_API, LectureType } from './general.share';
import { HttpClient } from '@angular/common/http';
import { Lecture } from '../share/lecture';
import { CarouselImage } from '../admin/carousel/carousel-image';
import { ViewType } from '../share/calendar/calendar.utils';
import { objectToFormData } from '../share/general-utils';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private static readonly GET_SERVICES = `${BASE_GENERAL_API}/services`;
  private static readonly GET_LECTURES = `${BASE_GENERAL_API}/lectures`;
  private static readonly GET_LECTURE_TYPE  = `${BASE_GENERAL_API}/lecture_type`;
  private static readonly GET_CAROUSEL = `${BASE_GENERAL_API}/carousel`;
  private static readonly POST_EMAIL = `${BASE_GENERAL_API}/email`;

  constructor(private _http: HttpClient) { }

  lectureTypes(): Promise<LectureType[]> {
    return this._http.get<{lectureTypes: LectureType[]}>(GeneralService.GET_SERVICES)
               .toPromise()
               .then(response => {
                 return response.lectureTypes;
               });
  }

  lectures(date: Date, viewType: ViewType): Promise<Lecture[]> {
    const dateTime = `${date.getTime()}`.substr(0, 10);
    return this._http.get<{lectures: Lecture[]}>(`${GeneralService.GET_LECTURES}/${ViewType[viewType].toLowerCase()}/${dateTime}`)
               .toPromise()
               .then(response => {
                 return response.lectures;
               });
  }

  carousel(): Promise<CarouselImage[]> {
    return this._http.get<{carousel: CarouselImage[]}>(GeneralService.GET_CAROUSEL)
               .toPromise()
               .then(response => {
                 return response.carousel.sort((a, b) => a.view_order - b.view_order);
               });
  }

  lectureTypeById(lectureId: number) {
    return this._http.get<{lecture_type: LectureType}>(`${GeneralService.GET_LECTURE_TYPE}/${lectureId}`)
               .toPromise()
               .then(response => {
                 return response.lecture_type;
               });
  }

  sendEmail(value: { message: string, name: string, email: string }) {
    const formData = objectToFormData(value);

    return this._http.post(GeneralService.POST_EMAIL, formData)
               .toPromise();
  }
}
