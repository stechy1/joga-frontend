import { Lecture } from './lecture';
import { DayAction } from './calendar/day-action';

export function objectToFormData(object: any): FormData {
  const formData = new FormData();

  const keys = Object.keys(object);
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = object[key];
    if (value !== undefined) {
      formData.append(key, `${value}`);
    }
  }

  return formData;
}

export function mapLectureToDayAction(lecture: Lecture): DayAction {
  const timeStart = new Date(lecture.time_start * 1000);
  const timeEnd = new Date(lecture.time_end * 1000);
  return {
    id: lecture.lecture_id,
    dayIndex: timeStart.getDate(),
    name: lecture.lecture_name,
    timeStart,
    timeEnd,
    reserved: lecture.reserved_clients,
    capacity: lecture.max_persons,
    place: lecture.place,
    published: lecture.published === 1,
    assigned: lecture.assigned
  } as DayAction;
}
