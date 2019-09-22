import { Component, Input} from '@angular/core';
import { CarouselService } from '../carousel.service';
import { CarouselImage } from '../carousel-image';

@Component({
  selector: 'app-active-images',
  templateUrl: './active-images.component.html',
  styleUrls: ['./active-images.component.css']
})
export class ActiveImagesComponent {

  @Input() images: CarouselImage[] = [];

  constructor(private _carouselService: CarouselService) { }

  private _getImageByViewOrder(viewOrder: number): CarouselImage {
    return this.images[this.images.findIndex(image => image.view_order === viewOrder)];
  }

  handleMoveLeft(image: CarouselImage) {
    if (image.view_order === 0) {
      return;
    }

    const leftImage = this._getImageByViewOrder(image.view_order - 1);
    leftImage.view_order++;
    image.view_order--;

    this._carouselService.update(image).catch(reason => console.log(reason));
    this._carouselService.update(leftImage).catch(reason => console.log(reason));
  }

  handleMoveRight(image: CarouselImage) {
    if (image.view_order === this.images.length) {
      return;
    }

    const rightImage = this._getImageByViewOrder(image.view_order + 1);
    rightImage.view_order--;
    image.view_order++;

    this._carouselService.update(image).catch(reason => console.log(reason));
    this._carouselService.update(rightImage).catch(reason => console.log(reason));
  }

}
