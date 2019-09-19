import { Lecture } from '../../../share/lecture';
import { dateToISOFormat, timeToISOFormat } from '../../../share/string-utils';

export interface LectureDialogModel {
  lecture_id?: number;
  trainer: number
  lecture_day: string
  time_start: string
  time_end: string
  max_persons: number
  place: string
  type: number
}

export function formValueToLecture(value: LectureDialogModel): Lecture {
  const timeStart = new Date(`${value.lecture_day} ${value.time_start}`);
  const timeEnd = new Date(`${value.lecture_day} ${value.time_end}`);

  return {
    lecture_id: value.lecture_id,
    trainer_id: value.trainer,
    time_start: timeStart.getTime(),
    time_end: timeEnd.getTime(),
    max_persons: value.max_persons,
    place: value.place,
    type: value.type
  }
}

export function lectureToFormValue(lecture: Lecture): LectureDialogModel {
  return {
    lecture_id: lecture.lecture_id,
    trainer: lecture.trainer_id,
    lecture_day: dateToISOFormat(new Date(lecture.time_start * 1000)),
    time_start: timeToISOFormat(new Date(lecture.time_start * 1000)),
    time_end: timeToISOFormat(new Date(lecture.time_end * 1000)),
    max_persons: lecture.max_persons,
    place: lecture.place,
    type: lecture.type
  };
}
