import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CarouselImageRecord } from './carousel-image-record';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  @Input() changeInterval = 5000;

  @Input() images: CarouselImageRecord[];
  private activeIndex = 0;
  private _interval: any;

  constructor() { }

  ngOnInit() {
    this._interval = setInterval(() => {
      this.handleNextImage();
    }, this.changeInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  handleNextImage() {
    this.activeIndex = (++this.activeIndex) % this.images.length;
    console.log(this.activeIndex);
  }

  handlePrevImage() {
    this.activeIndex = ((--this.activeIndex) < 0) ? this.images.length - 1 : (this.activeIndex % this.images.length);
    console.log(this.activeIndex);
  }

  handleShowImage(index: number) {
    this.activeIndex = index;
  }
}
