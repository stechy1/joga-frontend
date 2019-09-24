import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselImage} from './carousel-image';
import { CarouselService } from './carousel.service';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../../share/modal/modal.component';
import { Observable } from 'rxjs';
import { CarouselNewComponent } from './dialog/carousel-new.component';
import { CarouselUpdateComponent } from './dialog/carousel-update.component';

@Component({
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  images: Observable<CarouselImage[]>;

  constructor(private _carouselService: CarouselService) {
  }

  ngOnInit() {
    this.images = this._carouselService.all();
  }

  handleShowUploadDialog() {
    this.modal.showComponent = CarouselNewComponent;
    this.modal.open();
  }

  handleChangeEnabled(enabled: boolean, imageId: number) {
    this._carouselService.enable(imageId, enabled);
  }

  handleUpdateImage(imageId: number) {
    this.modal.showComponent = CarouselUpdateComponent;
    this.modal.open(imageId);
  }

  handleDeleteImage(imageId: number) {
    this._carouselService.delete(imageId)
        .then(() => {});
  }

  get isProd(): boolean {
    return environment.production;
  }
}
