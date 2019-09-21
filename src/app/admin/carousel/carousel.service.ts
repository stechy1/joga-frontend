import { Injectable } from '@angular/core';
import { BASE_ADMIN_API } from '../admin.share';
import { HttpClient } from '@angular/common/http';
import { CarouselImage } from './carousel-image';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeServiceEvent } from '../../share/change-service-event';
import { CRUDServiceType } from '../../share/crud-service-type';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'carousel';
  private static readonly GET_IMAGE = `${CarouselService.ACCESS_POINT}/image/`;

  private static readonly KEY_IMAGE_ID = 'id';
  private static readonly KEY_IMAGE_NAME = 'name';
  private static readonly KEY_IMAGE_DESCRIPTION = 'description';
  private static readonly KEY_IMAGE_INPUT = 'image';
  private static readonly KEY_IMAGE_ENABLED = 'enabled';
  private static readonly KEY_IMAGE_VIEW_ORDER = 'view_order';

  private readonly images$: BehaviorSubject<CarouselImage[]> = new BehaviorSubject<CarouselImage[]>([]);

  constructor(private _http: HttpClient) {}

  private _changeServiceEventHandler(event: ChangeServiceEvent<CarouselImage>) {
    if (event === null) {
      return;
    }

    const image = event.record;
    const images = this.images$.getValue();
    const imageIndex = images.findIndex(value => value.id === image.id);
    switch (event.changeType) {
      case CRUDServiceType.INSERT:
        if (imageIndex !== -1) {
          console.error(`Lekce s ID: ${imageIndex} již existuje!`);
          return;
        }

        images.push(image);
        break;
      case CRUDServiceType.UPDATE:
        if (imageIndex === -1) {
          console.error(`Lekce s ID: ${imageIndex} nebyla nalezena!`);
          return;
        }

        images[imageIndex] = image;
        break;
      case CRUDServiceType.DELETE:
        if (imageIndex === -1) {
          console.error(`Lekce s ID: ${imageIndex} nebyla nalezena!`);
          return;
        }

        images.splice(imageIndex, 1);
        break;
    }
    this.images$.next(images);
  }

  all(): Observable<CarouselImage[]> {
    this._http.get<{ images: CarouselImage[] }>(CarouselService.ACCESS_POINT)
        .toPromise()
        .then(result => {
          this.images$.next(result.images);
        });

    return this.images$;
  }

  byId(imageId: number): Promise<CarouselImage> {
    return this._http.get<{image: CarouselImage}>(CarouselService.GET_IMAGE + imageId)
               .toPromise()
               .then(result => {
                 return result.image;
               });
  }

  upload(imageModel: CarouselImage): Promise<CarouselImage> {
    const formData = new FormData();
    formData.append(CarouselService.KEY_IMAGE_NAME, imageModel.name);
    formData.append(CarouselService.KEY_IMAGE_DESCRIPTION, imageModel.description);
    formData.append(CarouselService.KEY_IMAGE_INPUT, imageModel.blob);

    return this._http
               .post<{image: CarouselImage}>(CarouselService.ACCESS_POINT, formData)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.image,
                   changeType: CRUDServiceType.INSERT
                 });

                 return result.image;
               });
  }

  update(imageModel: CarouselImage): Promise<CarouselImage> {
    const formData = new FormData();
    formData.append(CarouselService.KEY_IMAGE_ID, `${imageModel.id}`);
    formData.append(CarouselService.KEY_IMAGE_NAME, imageModel.name);
    formData.append(CarouselService.KEY_IMAGE_DESCRIPTION, imageModel.description);
    formData.append(CarouselService.KEY_IMAGE_ENABLED, `${imageModel.enabled}`);
    formData.append(CarouselService.KEY_IMAGE_VIEW_ORDER, `${imageModel.view_order}`);

    return this._http
               .post<{image: CarouselImage}>(`${CarouselService.ACCESS_POINT}/update`, formData)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.image,
                   changeType: CRUDServiceType.UPDATE
                 });

                 return result.image;
               });
  }

  delete(imageId: number): Promise<any> {
    return this._http
               .delete<{image: CarouselImage}>(`${CarouselService.ACCESS_POINT}/${imageId}`)
               .toPromise()
               .then(result => {
                 this._changeServiceEventHandler({
                   record: result.image,
                   changeType: CRUDServiceType.DELETE
                 });

                 return result.image;
               });
  }

  get lastImageFreeIndex(): number {
    return this.images$.getValue().filter(image => image.enabled).length;
  }

  enable(imageId: number, enabled: boolean): Promise<CarouselImage> {
    const image = this.images$.getValue()[this.images$.getValue().findIndex(value => value.id === imageId)];
    image.enabled = enabled ? 1 : 0;
    image.view_order = enabled ? this.lastImageFreeIndex : -1;
    return this.update(image);
  }
}
