import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit, OnDestroy {
  @Input() checked: Observable<boolean>;
  @Input() text: string;
  @Output() changed = new EventEmitter<any>();

  localValue: boolean;
  private _subscription: Subscription;
  constructor() { }

  ngOnInit() {
    this._subscription = this.checked.subscribe(value => {
      this.localValue = value;
    })
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  emitChange(newValue: boolean) {
    // const newValue = (event.target as HTMLInputElement).value;
    console.log(newValue);
    // if (this._localValue === newValue) {
    //   return;
    // }
    //
    // this._localValue = newValue;
    this.changed.emit(newValue);
  }
}
