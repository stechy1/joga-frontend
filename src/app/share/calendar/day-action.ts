export interface DayAction {
  id: number;
  dayIndex: number;
  name: string;
  timeStart: Date;
  timeEnd: Date;
  capacity: number;
  reserved: number;
  assigned?: boolean;
  place: string;
}
