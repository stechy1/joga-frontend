import { Component, Input, OnInit } from '@angular/core';
import { CarouselImageRecord } from './carousel-image-record';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() changeInterval = 5000;

  @Input() images: CarouselImageRecord[];
  private activeIndex = 0;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.handleNextImage();
    }, this.changeInterval);
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
