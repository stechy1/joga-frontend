import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselImage} from './carousel-image';
import { CarouselService } from './carousel.service';
import { environment } from '../../../environments/environment';
import { UploadComponent } from './dialog/upload/upload.component';
import { UpdateComponent } from './dialog/update/update.component';
import { ModalComponent } from '../../share/modal/modal.component';

@Component({
  selector: 'app-admin-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  private _images: CarouselImage[] = [];

  constructor(private _carouselService: CarouselService) {
  }

  ngOnInit() {
    this._carouselService.allImages()
        .then(images => {
          this._images = images;
        });
  }

  get images(): CarouselImage[] {
    return this._images;
  }

  handleShowUploadDialog() {
    this.modal.showComponent = UploadComponent;
    this.modal.open();
  }

  handleDeleteImage(index: number) {
    const image = this._images[index];
    if (image.isEnabled()) {
      return;
    }

    this._carouselService.delete(image.toCarouselImage()).catch(reason => console.log(reason));
  }

  handleChangeEnabled(enabled: boolean, index: number) {
    const image = this._images[index].toCarouselImage();
    image.enabled = enabled ? 1 : 0;
    this._carouselService.update(image).catch(reason => console.log(reason));
  }

  handleUpdateImage(index: number) {
    this.modal.showComponent = UpdateComponent;
    this.modal.open(this._images[index].toCarouselImage());
  }

  get isProd(): boolean {
    return environment.production;
  }
}
