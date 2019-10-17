import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { LectureService } from '../lecture.service';
import { Lecture } from '../../../share/lecture';
import { ClientOnLecture } from './client-on-lecture';
import { ModalComponent } from '../../../share/modal/modal.component';
import { MultilineInputComponent } from '../../../share/modal/multiline-input/multiline-input.component';
import { ToolbarButton } from '../../../share/markdown-editor/editor-toolbar/toolbar-button';
import { BUTTON_BOLD, BUTTON_ITALIC, BUTTON_LINK, BUTTON_ORDERED_LIST, BUTTON_QUOTES, BUTTON_STRIKETHROUGH, BUTTON_UNORDERED_LIST } from '../../../share/markdown-editor/editor-toolbar/toolbar-buttons';

@Component({
  selector: 'app-lecture-detail',
  templateUrl: './lecture-detail.component.html',
  styleUrls: ['./lecture-detail.component.css']
})
export class LectureDetailComponent implements OnInit, OnDestroy {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  lecture: Lecture;
  clients: ClientOnLecture[] = [];

  private readonly buttons = {};

  private _activatedRouteSubscription: Subscription;
  private _buttonsEmitter: EventEmitter<{}> = new EventEmitter<{}>();
  private _enableFileSystemEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly _service: LectureService, private readonly activatedRoute: ActivatedRoute) {
    this.buttons[BUTTON_BOLD.icon] = BUTTON_BOLD;
    this.buttons[BUTTON_ITALIC.icon] = BUTTON_ITALIC;
    this.buttons[BUTTON_STRIKETHROUGH.icon] = BUTTON_STRIKETHROUGH;
    this.buttons[BUTTON_QUOTES.icon] = BUTTON_QUOTES;
    this.buttons[BUTTON_ORDERED_LIST.icon] = BUTTON_ORDERED_LIST;
    this.buttons[BUTTON_UNORDERED_LIST.icon] = BUTTON_UNORDERED_LIST;
    this.buttons[BUTTON_LINK.icon] = BUTTON_LINK;
  }

  ngOnInit() {
    this._activatedRouteSubscription = this.activatedRoute.params.subscribe(params => this._handleParamsChange(params));
  }

  ngOnDestroy(): void {
    this._activatedRouteSubscription.unsubscribe();
  }

  private _handleParamsChange(params: Params): void {
    this._service.byId(params['id']).then(result => {
      const lecture = result.lecture;
      lecture.time_start *= 1000;
      lecture.time_end *= 1000;
      this.lecture = lecture;
      this.clients.splice(0);
      for (const client of result.clients) {
        client.created *= 1000;
        this.clients.push(client);
      }
    });
  }

  handleShowDialogForEmail() {
    this.modal.showComponent = MultilineInputComponent;
    this.modal.openForResult(this._buttonsEmitter, this._enableFileSystemEmitter).then(text => console.log(text)).catch(() => {});

    setTimeout(() => {
      this._buttonsEmitter.next(this.buttons);
      // this._enableFileSystemEmitter.next(true);
    }, 150);
  }
}
