import { DayAction } from './day-action';

export class CalendarDay {

  private _actions: DayAction[] = [];
  public viewSchedule: boolean;

  constructor(public readonly day: number, public readonly highlight: boolean = true) {}

  public addAction(action: DayAction) {
    this._actions.push(action);
  }

  get actions(): DayAction[] {
    return this._actions;
  }
}
