import { DayAction } from './day-action';

export class CalendarDay {

  private _actions: DayAction[] = [];
  public viewSchedule: boolean;
  public date: Date;

  constructor(public readonly day: number, public readonly highlight: boolean = true) {}

  public addAction(dayAction: DayAction) {
    const dayIndex = this._actions.findIndex(action => action.id === dayAction.id);
    if (dayIndex === -1) {
      this._actions.push(dayAction);
    } else {
      this._actions[dayIndex] = dayAction;
    }
  }

  get actions(): DayAction[] {
    return this._actions;
  }

  clearActions() {
    this._actions.splice(0);
  }
}
