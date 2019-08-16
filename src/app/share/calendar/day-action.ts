export interface DayAction {
  id: number;
  dayIndex: number;
  name: string;
  timeStart: Date;
  duration: number;
  capacity: number;
  reserved: number;
}
