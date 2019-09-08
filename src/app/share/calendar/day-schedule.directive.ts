import { ComponentFactoryResolver, Directive, EventEmitter, Output, Type, ViewContainerRef } from '@angular/core';
import { DialogChildComponent } from '../modal/dialog-child.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { CalendarDay } from './day';
import { Subscription } from 'rxjs';
import { DayAction } from './day-action';

@Directive({
  selector: '[appDaySchedule]'
})
export class DayScheduleDirective {

  private _instance: DayScheduleComponent = null;
  private _oldWindow: CalendarDay = null;
  private _newDayActionSubscription: Subscription;
  private _updateLectureSubscription: Subscription;

  @Output() newDayAction: EventEmitter<CalendarDay> = new EventEmitter<CalendarDay>();
  @Output() updateDayAction: EventEmitter<DayAction> = new EventEmitter<DayAction>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private _viewContainerRef: ViewContainerRef) { }

  showComponent(window: CalendarDay) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DayScheduleComponent);
    this._viewContainerRef.clear();
    if (this._oldWindow !== null && this._oldWindow !== window) {
      this._oldWindow.viewSchedule = false;
      this._newDayActionSubscription.unsubscribe();
      this._updateLectureSubscription.unsubscribe();
    }

    const component = this._viewContainerRef.createComponent(componentFactory);
    this._instance = (component.instance as DayScheduleComponent);
    this._instance.actions = window.actions;
    this._newDayActionSubscription = this._instance.newDayAction.subscribe(() => this.newDayAction.next(this._oldWindow));
    this._updateLectureSubscription = this._instance.updateDayAction.subscribe((dayAction) => this.updateDayAction.next(dayAction));
    window.viewSchedule = true;
    this._oldWindow = window;
  }

  hideComponent() {
    this._viewContainerRef.clear();
    this._instance = null;
    this._oldWindow.viewSchedule = false;
    this._oldWindow = null;
  }

  changeDay(window: CalendarDay) {
    this._instance.actions = window.actions;
    this._oldWindow.viewSchedule = false;
    window.viewSchedule = true;
    this._oldWindow = window;
  }
}
