import { Component, OnInit } from '@angular/core';
import { CarouselService } from '../carousel.service';
import { CarouselImage } from '../carousel-image';

@Component({
  selector: 'app-active-images',
  templateUrl: './active-images.component.html',
  styleUrls: ['./active-images.component.css']
})
export class ActiveImagesComponent implements OnInit {

  images: CarouselImage[] = [];

  constructor(private _carouselService: CarouselService) { }

  private _getImageByViewOrder(viewOrder: number): CarouselImage {
    return this.images[this.images.findIndex(image => image.getView_order() === viewOrder)];
  }

  ngOnInit() {
    this.images = this._carouselService.images;
    console.log(this.images);
  }

  handleMoveLeft(image: CarouselImage) {
    if (image.getView_order() === 0) {
      return;
    }

    const leftImage = this._getImageByViewOrder(image.getView_order() - 1);
    console.log('This image: ');
    console.log(image.toCarouselImage());
    console.log('Left image: ');
    console.log(leftImage.toCarouselImage());

    leftImage.increaseViewOrder();
    image.decreaseViewOrder();
    this._carouselService.update(image.toCarouselImage()).catch(reason => console.log(reason));
    this._carouselService.update(leftImage.toCarouselImage()).catch(reason => console.log(reason));
    console.log(this.images);
  }

  handleMoveRight(image: CarouselImage) {
    if (image.getView_order() === this.images.length - 1) {
      return;
    }

    const rightImage = this._getImageByViewOrder(image.getView_order() + 1);
    rightImage.decreaseViewOrder();
    image.increaseViewOrder();
    this._carouselService.update(image.toCarouselImage()).catch(reason => console.log(reason));
    this._carouselService.update(rightImage.toCarouselImage()).catch(reason => console.log(reason));
    console.log(this.images);
  }
}
