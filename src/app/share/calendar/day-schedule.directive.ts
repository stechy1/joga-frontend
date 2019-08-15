import { ComponentFactoryResolver, Directive, Type, ViewContainerRef } from '@angular/core';
import { DialogChildComponent } from '../modal/dialog-child.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { CalendarDay } from './day';

@Directive({
  selector: '[appDaySchedule]'
})
export class DayScheduleDirective {

  private _instance: DayScheduleComponent = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private _viewContainerRef: ViewContainerRef) { }

  showComponent(window: CalendarDay) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DayScheduleComponent);
    this._viewContainerRef.clear();

    const component = this._viewContainerRef.createComponent(componentFactory);
    this._instance = (<DayScheduleComponent>component.instance);
    this._instance.actions = window.actions;
  }

  hideComponent() {
    this._viewContainerRef.clear();
    this._instance = null;
  }

  toggleComponent(window: CalendarDay) {
    if (this._instance !== null) {
      this.hideComponent();
    } else {
      this.showComponent(window);
    }
  }

  changeDay(window: CalendarDay) {
    this._instance.actions = window.actions;
  }
}
