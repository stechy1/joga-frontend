import { Component, OnInit } from '@angular/core';
import { DialogChildComponent } from '../../../../share/modal/dialog-child.component';
import { ModalComponent } from '../../../../share/modal/modal.component';
import { of, Subscription } from 'rxjs';
import { LectureService } from '../../lecture.service';

@Component({
  selector: 'app-lecture-delete',
  templateUrl: './lecture-delete.component.html',
  styleUrls: ['./lecture-delete.component.css']
})
export class LectureDeleteComponent extends DialogChildComponent implements OnInit {

  private _confirmSubscription: Subscription;
  private _cancelSubscription: Subscription;
  private _showSubscription: Subscription;
  private _modal: ModalComponent;

  private _lectureId: number;

  constructor(private _lectureService: LectureService) {
    super();
  }

  private _prepareForm(lectureId: number) {
    this._lectureId = lectureId;
  }

  ngOnInit() {
  }

  bind(modal: ModalComponent) {
    modal.title = 'Potvrzení';
    modal.confirmText = 'Smazat';
    modal.cancelText = 'Zrušit';
    modal.confirmClose = true;
    this._confirmSubscription =  modal.confirm.subscribe(() => this.handleDeleteLecture());
    this._cancelSubscription =  modal.cancel.subscribe(() => modal.close());
    this._showSubscription =  modal.show.subscribe((args) => this._prepareForm(args[0]));
    modal.confirmDisabled = of(false);
    this._modal = modal;
  }

  unbind() {
    this._confirmSubscription.unsubscribe();
    this._cancelSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
    this._modal = null;
  }

  handleDeleteLecture() {
    this._lectureService.delete(this._lectureId)
        .then(() => this._modal.close())
        .catch(reason => console.log(reason));
    return false;
  }

}
