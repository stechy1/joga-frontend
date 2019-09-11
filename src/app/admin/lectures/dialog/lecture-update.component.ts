import { LectureDialogComponent } from './lecture-dialog.component';
import { Component } from '@angular/core';
import { formValueToLecture, lectureToFormValue } from './lecture-dialog.utils';
import { ModalComponent } from '../../../share/modal/modal.component';

@Component({
  templateUrl: './lecture-dialog.component.html'
})
export class LectureUpdateComponent extends LectureDialogComponent {

  bind(modal: ModalComponent) {
    super.bind(modal);
    modal.title = 'Upravení lekce';
    modal.confirmText = 'Upravit';
    modal.cancelText = 'Zrušit';
  }

  protected prepareForm(lectureId: number) {
    this._lectureService.byId(lectureId)
        .then(lecture => {
          this.lectureForm.patchValue(lectureToFormValue(lecture));
        })
        .catch(reason => {
          console.log(reason);
        });
  }

  protected handleConfirmLecture(): Promise<any> {
    return this._lectureService.update(formValueToLecture(this.lectureForm.value))
  }

}
