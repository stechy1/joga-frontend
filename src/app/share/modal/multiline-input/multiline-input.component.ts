import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DialogChildComponent } from '../dialog-child.component';
import { ModalComponent } from '../modal.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileRecord } from '../../file-browser/file-record';

@Component({
  selector: 'app-multiline-input',
  templateUrl: './multiline-input.component.html',
  styleUrls: ['./multiline-input.component.css']
})
export class MultilineInputComponent extends DialogChildComponent implements OnInit {

  @Input() buttons: Observable<{}>;
  @Input() enableFileAccess: Observable<boolean>;

  textForm = new FormGroup({
    text: new FormControl(null, Validators.required)
  });

  private _formInvalid: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _text: EventEmitter<FileRecord> = new EventEmitter<FileRecord>();
  private _insertFileSubscription: Subscription;
  private _showSubscription: Subscription;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.textForm.statusChanges.subscribe((state: string) => {
      this._formInvalid.next(!(state !== 'INVALID'));
    });
  }

  bind(modal: ModalComponent) {
    modal.confirmClose = false;
    modal.confirmDisabled = this._formInvalid;
    modal.result = this._text;
    this._insertFileSubscription = modal.confirm.subscribe(() => this.handleInsertFile());
    this._showSubscription = modal.show.subscribe(args => this.prepareForm(args[0][0], args[0][1]));
  }

  unbind(modal: ModalComponent) {
    this._insertFileSubscription.unsubscribe();
    this._showSubscription.unsubscribe();
  }

  private handleInsertFile() {
    this._text.next(this.textForm.get('text').value);
  }

  private prepareForm(buttons: Observable<{}>, enableFileAccess: Observable<boolean>) {
    this.buttons = buttons;
    this.enableFileAccess = enableFileAccess;
  }
}
