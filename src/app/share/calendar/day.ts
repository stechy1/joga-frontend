import { DayAction } from './day-action';

export class CalendarDay {

  private _actions: DayAction[] = [];

  constructor(public readonly day: number, public readonly highlight: boolean = true) {
    // this.addAction(new DayAction(
    //   1, 1, 'Day action', new Date(), 2, 10, 5
    // ));
  }

  public addAction(action: DayAction) {
    this._actions.push(action);
  }

  get actions(): DayAction[] {
    return this._actions;
  }
}
