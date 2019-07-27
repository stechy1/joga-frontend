import { Component, OnInit } from '@angular/core';
import { CarouselImageRecord } from '../../../share/carousel/carousel-image-record';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  private _images = [
    'https://lorempixel.com/800/400/food/1',
    'https://lorempixel.com/800/400/food/2',
    'https://lorempixel.com/800/400/food/3',
    'https://lorempixel.com/800/400/food/4'
  ];


  constructor() { }

  ngOnInit() {
  }

  get images(): CarouselImageRecord[] {
    return this._images.map(image => {
      return {url: image, visible: false, description: 'Lorem ipsum dolor samet bla bla bla', title: 'Titulek obrázku'};
    });
  }
}
