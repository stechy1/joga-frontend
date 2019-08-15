export class DayAction {

  constructor(public readonly id,
              public readonly dayIndex: number, public readonly name: string,
              public readonly time_start: Date, public readonly duration: number,
              public readonly capacity: number, public readonly reserved: number) {

  }

  get freeSpaces() {
    return this.capacity - this.reserved;
  }
}
