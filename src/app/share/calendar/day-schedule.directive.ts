import { ComponentFactoryResolver, Directive, Type, ViewContainerRef } from '@angular/core';
import { DialogChildComponent } from '../modal/dialog-child.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { CalendarDay } from './day';

@Directive({
  selector: '[appDaySchedule]'
})
export class DayScheduleDirective {

  private _instance: DayScheduleComponent = null;
  private _oldWindow: CalendarDay = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private _viewContainerRef: ViewContainerRef) { }

  showComponent(window: CalendarDay) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DayScheduleComponent);
    this._viewContainerRef.clear();
    if (this._oldWindow !== null && this._oldWindow !== window) {
      this._oldWindow.viewSchedule = false;
    }

    const component = this._viewContainerRef.createComponent(componentFactory);
    this._instance = (component.instance as DayScheduleComponent);
    this._instance.actions = window.actions;
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