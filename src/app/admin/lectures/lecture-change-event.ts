import { Lecture } from './lecture';

export interface LectureChangeEvent {

  lecture: Lecture;
  changeType: LectureChangeType;

}

export enum LectureChangeType {
  INSERT,
  UPDATE,
  DELETE
}
