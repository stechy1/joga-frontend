import { Component, OnInit } from '@angular/core';
import { CarouselImage, ICarouselImage } from './carousel-image';
import { CarouselService } from './carousel.service';
import { ModalService } from '../../share/modal/modal.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  private static readonly UPLOAD_DIALOG_ID = 'carouselImageUploadDialog';

  private _images: CarouselImage[] = [];

  constructor(private _carouselService: CarouselService, private _modal: ModalService) {
  }

  ngOnInit() {
    this._carouselService.allImages()
        .then(images => {
          this._images = images;
        });
  }

  get images(): CarouselImage[] {
    return this._images;
  }

  handleUploadImage($event: any) {

  }

  handleShowUploadDialog() {
    this._modal.open(CarouselComponent.UPLOAD_DIALOG_ID);
  }

  handleDeleteImage(index: number) {
    this._carouselService.delete(this._images[index]).catch(reason => console.log(reason));
  }

  get isProd(): boolean {
    return environment.production;
  }

}
