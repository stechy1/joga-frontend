import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

export interface ImageRecord {
  url: string;
  visible: boolean;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, AfterViewChecked {

  private _images: ImageRecord[];
  private activeIndex = 0;
  top: number;

  @ViewChild('carouselWrapper', {static: true}) carouselWrapper: ElementRef<HTMLElement>;
  @ViewChild('carouselNavigation', {static: true}) carouselNavigation: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
    this.images = [
      'https://lorempixel.com/800/400/food/1',
      'https://lorempixel.com/800/400/food/2',
      'https://lorempixel.com/800/400/food/3',
      'https://lorempixel.com/800/400/food/4'
    ];

    const wrapperHeight = this.carouselWrapper.nativeElement.clientHeight / 2;
    const navigationHeight = this.carouselNavigation.nativeElement.clientHeight / 2;
    this.top = wrapperHeight - navigationHeight;
  }

  ngAfterViewChecked(): void {


  }

  handleNextImage() {
    this.activeIndex = (++this.activeIndex) % this._images.length;
    console.log(this.activeIndex);
  }

  handlePrevImage() {
    this.activeIndex = ((--this.activeIndex) < 0) ? this._images.length - 1 : (this.activeIndex % this._images.length);
    console.log(this.activeIndex);
  }

  @Input() set images(value: string[]) {
    this._images = value.map(image => {
      return {url: image, visible: false};
    });
  }

  getImages(): ImageRecord[] {
    return this._images;
  }
}
