import { Injectable } from '@angular/core';
import { BASE_ADMIN_API } from '../admin.share';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarouselImage } from './carousel-image';
import { UploadImageModel } from './upload/upload-image-model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private static readonly ACCESS_POINT = BASE_ADMIN_API + 'carousel';

  private static readonly KEY_POST_UPLOAD_NAME = 'name';
  private static readonly KEY_POST_UPLOAD_DESCRIPTION = 'description';
  private static readonly KEY_POST_UPLOAD_IMAGE = 'image';

  constructor(private _http: HttpClient) {
  }

  allImages(): Promise<CarouselImage[]> {
    return this._http.get<{images: []}>(CarouselService.ACCESS_POINT)
               .toPromise()
               .then(result => {
                 return result.images as CarouselImage[];
               });
  }

  upload(imageModel: UploadImageModel): Promise<string> {
    const formData = new FormData();
    formData.append(CarouselService.KEY_POST_UPLOAD_NAME, imageModel.name);
    formData.append(CarouselService.KEY_POST_UPLOAD_DESCRIPTION, imageModel.description);
    formData.append(CarouselService.KEY_POST_UPLOAD_IMAGE, imageModel.imageInput);

    // return new Promise<string>(resolve => {
    //   console.log('Nahravam data: ');
    //   console.log(imageModel);
    //   resolve();
    // });
    return new Promise<string>((resolve) => {
      this._http.post<string>(CarouselService.ACCESS_POINT, formData).subscribe(value => {
        console.log(value);
        resolve();
      });
    });
  }
}
