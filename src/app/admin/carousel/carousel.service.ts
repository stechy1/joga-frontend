import { Injectable } from '@angular/core';
import { BASE_ADMIN_API } from '../admin.share';
import { HttpClient } from '@angular/common/http';
import { CarouselImage, ICarouselImage } from './carousel-image';
import { UploadImageModel } from './dialog/upload/upload-image-model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'carousel';

  private static readonly KEY_IMAGE_ID = 'id';
  private static readonly KEY_IMAGE_NAME = 'name';
  private static readonly KEY_IMAGE_DESCRIPTION = 'description';
  private static readonly KEY_IMAGE_INPUT = 'image';
  private static readonly KEY_IMAGE_ENABLED = 'enabled';
  private static readonly KEY_IMAGE_VIEW_ORDER = 'view_order';

  private _images: CarouselImage[] = [];

  constructor(private _http: HttpClient) {
    this._http
        .get<{ images: ICarouselImage[] }>(CarouselService.ACCESS_POINT)
        .pipe(
          map(value => value.images.map(image => new CarouselImage(image))),
          tap(images => {
            images.forEach(image => {
              this._images.push(image);
            });
          }))
        .toPromise()
        .catch((reason => console.log(reason)));
  }

  upload(imageModel: UploadImageModel): Promise<void> {
    const formData = new FormData();
    formData.append(CarouselService.KEY_IMAGE_NAME, imageModel.name);
    formData.append(CarouselService.KEY_IMAGE_DESCRIPTION, imageModel.description);
    formData.append(CarouselService.KEY_IMAGE_INPUT, imageModel.imageInput);

    return this._http
               .post<{ image: ICarouselImage }>(CarouselService.ACCESS_POINT, formData)
               .toPromise()
               .then(responce => {
                 this._images.push(new CarouselImage(responce.image));
                 return null;
               });
  }

  update(imageModel: ICarouselImage): Promise<void> {
    const formData = new FormData();
    formData.append(CarouselService.KEY_IMAGE_ID, imageModel.id);
    formData.append(CarouselService.KEY_IMAGE_NAME, imageModel.name);
    formData.append(CarouselService.KEY_IMAGE_DESCRIPTION, imageModel.description);
    formData.append(CarouselService.KEY_IMAGE_ENABLED, `${imageModel.enabled}`);
    formData.append(CarouselService.KEY_IMAGE_VIEW_ORDER, `${imageModel.view_order}`);

    return this._http
               .post<void>(CarouselService.ACCESS_POINT + '/update', formData)
               .toPromise()
               .then(() => {
                 this._images[this.images.findIndex(image => image.getId() === imageModel.id)].update(imageModel);
                 return null;
               });
  }

  delete(image: ICarouselImage): Promise<any> {
    return this._http
               .delete<void>(CarouselService.ACCESS_POINT + '/' + image.id)
               .toPromise()
               .then(() => {
                 this._images.splice(this._images.findIndex(entry => entry.getId() === image.id), 1);
               });
  }

  get images(): CarouselImage[] {
    return this._images;
  }

  get lastImageFreeIndex(): number {
    return this._images.filter(image => image.isEnabled()).length;
  }
}
