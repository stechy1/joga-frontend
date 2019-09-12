import { Injectable } from '@angular/core';
import { BASE_ADMIN_API } from '../admin.share';
import { LectureType } from './lecture-type';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeServiceEvent } from '../../share/change-service-event';
import { CRUDServiceType } from '../../share/crud-service-type';

@Injectable({
  providedIn: 'root'
})
export class LectureTypesService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'lectureTypes';
  private static readonly GET_LECTURE_TYPE_BY_ID = `${LectureTypesService.ACCESS_POINT}/id`;
  private static readonly UPDATE_LECTURE_TYPE = `${LectureTypesService.ACCESS_POINT}/update`;

  private readonly lectures$: BehaviorSubject<LectureType[]> = new BehaviorSubject<LectureType[]>([]);

  constructor(private _http: HttpClient) {}

  private _changeServiceEventHandler(event: ChangeServiceEvent<LectureType>) {
    if (event === null) {
      return
    }
    const lectureType = event.record;
    const lectureTypes = this.lectures$.getValue();
    const lectureTypeIndex = lectureTypes.findIndex(value => value.id === lectureType.id);
    switch (event.changeType) {
      case CRUDServiceType.INSERT:
        if (lectureTypeIndex !== -1) {
          console.error(`Typ lekce s ID: ${lectureTypeIndex} již existuje!`);
          return;
        }

        lectureTypes.push(lectureType);
        break;
      case CRUDServiceType.UPDATE:
        if (lectureTypeIndex === -1) {
          console.error(`Typ lekce s ID: ${lectureTypeIndex} nebyl nalezen!`);
          return;
        }

        lectureTypes[lectureTypeIndex] = lectureType;
        break;
      case CRUDServiceType.DELETE:
        if (lectureTypeIndex === -1) {
          console.error(`Typ lekce s ID: ${lectureTypeIndex} nebyl nalezen!`);
          return;
        }

        lectureTypes.splice(lectureTypeIndex, 1);
        break;
    }
    this.lectures$.next(lectureTypes);
  }

  all(): Observable<LectureType[]> {
    this._http.get<{lectureTypes: LectureType[]}>(LectureTypesService.ACCESS_POINT)
               .toPromise()
               .then(result => {
                 this.lectures$.next(result.lectureTypes);
               });

    return this.lectures$;
  }

  byId(lectureTypeId: number): Promise<LectureType> {
    const url = `${LectureTypesService.GET_LECTURE_TYPE_BY_ID}/${lectureTypeId}`;

    return this._http.get<{lectureType: LectureType}>(url)
               .toPromise()
               .then(result => {
                 return result.lectureType;
               });
  }

  insert(lectureType: LectureType): Promise<LectureType> {
    const formData = new FormData();
    formData.append('name', lectureType.name);
    formData.append('description', lectureType.description);
    formData.append('price', `${lectureType.price}`);

    return this._http.post<{lectureType: LectureType}>(LectureTypesService.ACCESS_POINT, formData)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.lectureType,
                   changeType: CRUDServiceType.INSERT
                 });
                 return result.lectureType
               });
  }

  update(lectureType: LectureType): Promise<LectureType> {
    const formData = new FormData();
    formData.append('id', `${lectureType.id}`);
    formData.append('name', lectureType.name);
    formData.append('description', lectureType.description);
    formData.append('price', `${lectureType.price}`);

    return this._http.post<{ lectureType: LectureType }>(LectureTypesService.UPDATE_LECTURE_TYPE, formData)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.lectureType,
                   changeType: CRUDServiceType.UPDATE
                 });
                 return result.lectureType
               });
  }

  delete(lectureTypeId: number): Promise<LectureType> {
    return this._http.delete<{lectureType: LectureType}>(`${LectureTypesService.ACCESS_POINT}/${lectureTypeId}`)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.lectureType,
                   changeType: CRUDServiceType.DELETE
                 });
                 return result.lectureType;
               });
  }

}
