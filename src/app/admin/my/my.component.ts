import { Component, OnInit } from '@angular/core';
import { MyService } from './my.service';
import { NGXLogger } from 'ngx-logger';
import { ToolbarButton } from '../../share/markdown-editor/editor-toolbar/toolbar-button';
import { BUTTON_BOLD, BUTTON_ITALIC, BUTTON_LINK, BUTTON_ORDERED_LIST, BUTTON_QUOTES, BUTTON_STRIKETHROUGH, BUTTON_UNORDERED_LIST } from '../../share/markdown-editor/editor-toolbar/toolbar-buttons';

@Component({
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  aboutMe: string;
  aboutStudio: string;
  buttons = {};
    // BUTTON_BOLD,
    // BUTTON_ITALIC,
    // BUTTON_STRIKETHROUGH,
    // BUTTON_QUOTES,
    // BUTTON_ORDERED_LIST,
    // BUTTON_UNORDERED_LIST,
    // BUTTON_LINK,
  // };

  constructor(private _myService: MyService,
              private logger: NGXLogger) {
    this.buttons[BUTTON_BOLD.icon] = BUTTON_BOLD;
    this.buttons[BUTTON_ITALIC.icon] = BUTTON_ITALIC;
    this.buttons[BUTTON_STRIKETHROUGH.icon] = BUTTON_STRIKETHROUGH;
    this.buttons[BUTTON_QUOTES.icon] = BUTTON_QUOTES;
    this.buttons[BUTTON_ORDERED_LIST.icon] = BUTTON_ORDERED_LIST;
    this.buttons[BUTTON_UNORDERED_LIST.icon] = BUTTON_UNORDERED_LIST;
    this.buttons[BUTTON_LINK.icon] = BUTTON_LINK;
  }

  ngOnInit() {
    this._myService.download().then(value => {
      this.aboutMe = value.my;
      this.aboutStudio = value.studio;
    });
  }

  handleSave(what: string) {
    this._myService.save(what, what === 'my' ? this.aboutMe : this.aboutStudio).catch(reason => this.logger.error(reason));
  }

  handlePublish(what: string) {
    this._myService.publish(what).catch(reason => this.logger.error(reason));
  }
}
