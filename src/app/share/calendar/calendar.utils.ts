export class Months {
  public static readonly JANUARY = {
    index: 0,
    name: 'Leden'
  };
  public static readonly FEBRUARY = {
    index: 1,
    name: 'Únor'
  };
  public static readonly MARCH = {
    index: 2,
    name: 'Březen'
  };
  public static readonly APRIL = {
    index: 3,
    name: 'Duben'
  };
  public static readonly MAY = {
    index: 4,
    name: 'Květen'
  };
  public static readonly JUNE = {
    index: 5,
    name: 'Červen'
  };
  public static readonly JULY = {
    index: 6,
    name: 'Červenec'
  };
  public static readonly AUGUST = {
    index: 7,
    name: 'Srpen'
  };
  public static readonly SEPTEMBER = {
    index: 8,
    name: 'Září'
  };
  public static readonly OCTOBER = {
    index: 9,
    name: 'Říjen'
  };
  public static readonly NOVEMBER = {
    index: 10,
    name: 'Listopad'
  };
  public static readonly DECEMBER = {
    index: 11,
    name: 'Prosinec'
  };

  public static getFullNames(): string[] {
    return [
      Months.JANUARY.name,
      Months.FEBRUARY.name,
      Months.MARCH.name,
      Months.APRIL.name,
      Months.MAY.name,
      Months.JUNE.name,
      Months.JULY.name,
      Months.AUGUST.name,
      Months.SEPTEMBER.name,
      Months.OCTOBER.name,
      Months.NOVEMBER.name,
      Months.DECEMBER.name,
    ];
  }

  public static getFullName(index: number): string {
    return this.getFullNames()[index];
  }

  public static getPrevMonth(date: Date): Date {
    let year = date.getFullYear();
    let month = date.getMonth();
    if ((month) === Months.JANUARY.index) {
      year--;
      month = Months.DECEMBER.index;
    } else {
      month -= 1;
    }
    return new Date(year, month + 1, 0);
  }

  public static getNextMonth(date: Date): Date {
    let year = date.getFullYear();
    let month = date.getMonth();
    if ((month) === Months.DECEMBER.index) {
      year++;
      month = Months.JANUARY.index;
    } else {
      month += 1;
    }
    return new Date(year, month + 1, 0);
  }
}

export class Days {
  public static readonly MONDAY = {
    index: 1,
    name: 'Pondělí',
    nameShort: 'Po'
  };
  public static readonly TUESDAY = {
    index: 2,
    name: 'Úterý',
    nameShort: 'Út'
  };
  public static readonly Wednesday = {
    index: 3,
    name: 'Středa',
    nameShort: 'St'
  };
  public static readonly THURSDAY = {
    index: 4,
    name: 'Čtvrtek',
    nameShort: 'Čt'
  };
  public static readonly FRIDAY = {
    index: 5,
    name: 'Pátek',
    nameShort: 'Pá'
  };
  public static readonly SATURDAY = {
    index: 6,
    name: 'Sobota',
    nameShort: 'So'
  };
  public static readonly SUNDAY = {
    index: 0,
    name: 'Neděle',
    nameShort: 'Ne'
  };

  public static getShortNames() {
    return [
      Days.MONDAY.nameShort,
      Days.TUESDAY.nameShort,
      Days.Wednesday.nameShort,
      Days.THURSDAY.nameShort,
      Days.FRIDAY.nameShort,
      Days.SATURDAY.nameShort,
      Days.SUNDAY.nameShort,
    ];
  }

  public static getFullNames() {
    return [
      Days.MONDAY.name,
      Days.TUESDAY.name,
      Days.Wednesday.name,
      Days.THURSDAY.name,
      Days.FRIDAY.name,
      Days.SATURDAY.name,
      Days.SUNDAY.name,
    ];
  }

  public static getFullName(index: number): string {
    return this.getFullNames()[index % 7];
  }
}

export function getDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getDaysInPrevMonth(date: Date) {
  return Months.getPrevMonth(date).getDate() + 1;
}

export function getDaysInNextMonth(date: Date) {
  return Months.getNextMonth(date).getDate() + 1;
}

export function getFirstDayOffset(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDay();
}

export function getWeek(timeStamp: number): number {
  const date = new Date(timeStamp);

  // ISO week date weeks start on Monday, so correct the day number
  const nDay = (date.getDay() + 6) % 7;

  // ISO 8601 states that week 1 is the week with the first Thursday of that year
  // Set the target date to the Thursday in the target week
  date.setDate(date.getDate() - nDay + 3);

  // Store the millisecond value of the target date
  const n1stThursday = date.valueOf();

  // Set the target to the first Thursday of the year
  // First, set the target to January 1st
  date.setMonth(0, 1);

  // Not a Thursday? Correct the date to the next Thursday
  if (date.getDay() !== 4) {
    date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
  }

  // The week number is the number of weeks between the first Thursday of the year
  // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
  return 1 + Math.ceil((n1stThursday - date.getTime()) / 604800000);
}

export enum ViewType {
  MONTH, WEEK, AGENDA
}
