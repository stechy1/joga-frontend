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

  ngOnInit() {
    this.images = this._carouselService.images;
  }

}
