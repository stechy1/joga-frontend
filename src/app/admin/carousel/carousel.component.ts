import { Component, OnInit } from '@angular/core';
import { CarouselImage } from './carousel-image';
import { CarouselService } from './carousel.service';
import { ModalService } from '../../share/modal/modal.service';

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
}
