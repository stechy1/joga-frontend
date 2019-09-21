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
    // const image = this._images[index].toCarouselImage();
    // image.enabled = enabled ? 1 : 0;
    // if (image.enabled) {
    //   image.view_order = this._carouselService.lastImageFreeIndex;
    // } else {
    //   image.view_order = -1;
    // }
    // this._carouselService.update(image).catch(reason => console.log(reason));
  }

  handleUpdateImage(imageId: number) {
    this.modal.showComponent = CarouselUpdateComponent;
    this.modal.open(imageId);
    // this.modal.showComponent = UpdateComponent;
    // this.modal.open(this._images[index].toCarouselImage());
  }

  handleDeleteImage(imageId: number) {
    this._carouselService.delete(imageId)
        .then(() => {});
    // const image = this._images[index];
    // if (image.isEnabled()) {
    //   return;
    // }

    // this._carouselService.delete(image.toCarouselImage()).catch(reason => console.log(reason));
  }

  get isProd(): boolean {
    return environment.production;
  }
}
