import { Injectable } from '@angular/core';
import { BASE_ADMIN_API } from '../admin.share';
import { HttpClient } from '@angular/common/http';
import { CarouselImage, ICarouselImage } from './carousel-image';
import { UploadImageModel } from './upload/upload-image-model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'carousel';

  private static readonly KEY_POST_UPLOAD_NAME = 'name';
  private static readonly KEY_POST_UPLOAD_DESCRIPTION = 'description';
  private static readonly KEY_POST_UPLOAD_IMAGE = 'image';

  private _images: CarouselImage[] = [];

  constructor(private _http: HttpClient) {
  }

  allImages(): Promise<CarouselImage[]> {
    return this._http.get<{ images: ICarouselImage[] }>(CarouselService.ACCESS_POINT)
                     .pipe(
                       map(value => value.images.map(image => new CarouselImage(image))),
                       tap(images => this._images = images))
                     .toPromise();
  }

  upload(imageModel: UploadImageModel): Promise<void> {
    const formData = new FormData();
    formData.append(CarouselService.KEY_POST_UPLOAD_NAME, imageModel.name);
    formData.append(CarouselService.KEY_POST_UPLOAD_DESCRIPTION, imageModel.description);
    formData.append(CarouselService.KEY_POST_UPLOAD_IMAGE, imageModel.imageInput);

    return new Promise<void>((resolve) => {
      this._http.post<{image: ICarouselImage}>(CarouselService.ACCESS_POINT, formData).subscribe(responce => {
        this._images.push(new CarouselImage(responce.image));
        resolve(null);
      });
    });
  }

  update(imageModel: UploadImageModel): Promise<any> {
    return new Promise<any>(resolve => resolve());
  }
}
