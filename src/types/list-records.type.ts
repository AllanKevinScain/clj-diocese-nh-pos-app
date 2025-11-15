import type { CompleteRecordInterface } from './complete-record.type';

export interface ListRecordsInterface {
  records?: CompleteRecordInterface[];
  courseNumber?: string;
  loading?: boolean;
}
