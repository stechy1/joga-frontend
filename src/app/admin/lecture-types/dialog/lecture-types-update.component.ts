import { LectureTypesDialogComponent } from './lecture-types-dialog.component';
import { Component } from '@angular/core';
import { ModalComponent } from '../../../share/modal/modal.component';

@Component({
  templateUrl: './lecture-types-dialog.component.html'
})
export class LectureTypesUpdateComponent extends LectureTypesDialogComponent{

  bind(modal: ModalComponent) {
    super.bind(modal);
    modal.title = 'Upravit typ lekce';
    modal.confirmText = 'Upravit';
    modal.cancelText = 'Zrušit';
  }

  protected prepareForm(lectureTypeId: number) {
    this._lectureTypesService.byId(lectureTypeId+1)
        .then(lectureType => {
          this.lectureTypeForm.patchValue(lectureType);
        })
        .catch(reason => {
          console.log(reason);
        });
  }

  protected handleConfirmLectureType(): Promise<any> {
    return this._lectureTypesService.update(this.lectureTypeForm.value);
  }

}
