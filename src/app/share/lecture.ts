export interface Lecture {
  lecture_id?: number;
  type?: number;
  lecture_name?: string;
  time_start: number;
  time_end: number;
  max_persons: number;
  place: string;
  trainer_id: number;
  trainer_name?: string;
  reserved_clients?: number;
  published?: number;
  assigned?: boolean;
}
