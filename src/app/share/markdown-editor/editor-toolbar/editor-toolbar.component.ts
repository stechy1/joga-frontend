import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolbarButton } from './toolbar-button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent implements OnInit {

  @Input() buttons: Observable<ToolbarButton[]>;
  @Output() btnClick: EventEmitter<ToolbarButton> = new EventEmitter<ToolbarButton>();

  realButtons: ToolbarButton[] = [];

  constructor() { }

  ngOnInit() {
    this.buttons.subscribe(buttons => {
      console.log(buttons);
      this.realButtons = buttons;
    })
  }
}
