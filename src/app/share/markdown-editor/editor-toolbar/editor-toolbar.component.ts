import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolbarButton } from './toolbar-button';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent implements OnInit {

  @Input() buttons: ToolbarButton[] = [];
  @Output() btnClick: EventEmitter<ToolbarButton> = new EventEmitter<ToolbarButton>();

  constructor() { }

  ngOnInit() {
  }
}
