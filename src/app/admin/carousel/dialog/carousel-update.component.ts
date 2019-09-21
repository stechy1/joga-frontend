import { Component} from '@angular/core';
import { ModalComponent } from '../../../share/modal/modal.component';
import { CarouselDialogComponent } from './carousel-dialog.component';
import { CarouselImage } from '../carousel-image';

@Component({
  templateUrl: './carousel-dialog.component.html',
})
export class CarouselUpdateComponent extends CarouselDialogComponent {

  private _image: CarouselImage;

  bind(modal: ModalComponent) {
    super.bind(modal);
    modal.title = 'Upravit obrázek v prezentaci';
    modal.confirmText = 'Upravit';
    modal.cancelText = 'Zrušit';
  }

  protected prepareForm(imageId: number) {
    this.isNew = false;
    this._service.byId(imageId)
        .then(image => {
          this._image = image;
          this.carouselForm.patchValue(image);
          (this.image.nativeElement as HTMLImageElement).src = `/public/uploads/image/${image.path}`;
        });
    this.carouselForm.get('blob').validator = null;
  }

  protected handleConfirmLecture(): Promise<any> {
    this._image.name = this.carouselForm.get('name').value;
    this._image.description = this.carouselForm.get('description').value;

    return this._service.update(this._image);
  }

}
