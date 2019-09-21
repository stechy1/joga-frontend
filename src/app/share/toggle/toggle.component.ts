import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {

  @Input() text: string;
  @Output() changed = new EventEmitter<any>();

  @Input()
  localValue: boolean;
  constructor() { }

  emitChange(newValue: boolean) {
    this.changed.emit(newValue);
  }
}
