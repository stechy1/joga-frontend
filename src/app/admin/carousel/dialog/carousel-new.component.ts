import { Component, OnInit } from '@angular/core';
import { CarouselDialogComponent } from './carousel-dialog.component';
import { ModalComponent } from '../../../share/modal/modal.component';

@Component({
  templateUrl: './carousel-dialog.component.html',
})
export class CarouselNewComponent extends CarouselDialogComponent {


  bind(modal: ModalComponent) {
    super.bind(modal);
    modal.title = 'Nový obrázek do prezentace';
    modal.confirmText = 'Vytvořit';
    modal.cancelText = 'Zrušit';
  }

  protected prepareForm(value: any) {

  }

  protected handleConfirmLecture(): Promise<any> {
    return this._service.upload(this.carouselForm.value)
               .then(() => {});
  }

}
