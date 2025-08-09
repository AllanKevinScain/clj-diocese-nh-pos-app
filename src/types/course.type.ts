import type { RecordType } from './generic-types.type';

export interface CourseResponseInterface {
  id: string;
  typeOfCourse: RecordType;
  courseNumber: string;
  startDate: string;
  endDate: string;
}
