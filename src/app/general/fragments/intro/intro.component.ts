import { Component, OnInit } from '@angular/core';
import { CarouselImageRecord } from '../../../share/carousel/carousel-image-record';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  private static readonly URL_PATH = '/public/uploads/image';

  private _images = [
    // 'https://lorempixel.com/800/400/food/1',
    // 'https://lorempixel.com/800/400/food/2',
    // 'https://lorempixel.com/800/400/food/3',
    // 'https://lorempixel.com/800/400/food/4'
  ];


  constructor(private _service: GeneralService) { }

  ngOnInit() {
    this._service.carousel()
        .then(images => {
          this._images = images;
        });
  }

  get images(): CarouselImageRecord[] {
    return this._images.map(image => {
      return {url: `${IntroComponent.URL_PATH}/${image.path}`, visible: image.enabled, description: image.description, title: image.name};
    });
  }
}
