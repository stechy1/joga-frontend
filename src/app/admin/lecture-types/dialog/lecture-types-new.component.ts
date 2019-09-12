import { LectureTypesDialogComponent } from './lecture-types-dialog.component';
import { Component } from '@angular/core';
import { ModalComponent } from '../../../share/modal/modal.component';

@Component({
  templateUrl: './lecture-types-dialog.component.html'
})
export class LectureTypesNewComponent extends LectureTypesDialogComponent{

  bind(modal: ModalComponent) {
    super.bind(modal);
    modal.title = 'Nový typ lekce';
    modal.confirmText = 'Založit';
    modal.cancelText = 'Zrušit';
  }

  protected prepareForm(value: any) {}

  protected handleConfirmLectureType(): Promise<any> {
    return this._lectureTypesService.insert(this.lectureTypeForm.value);
  }

}
