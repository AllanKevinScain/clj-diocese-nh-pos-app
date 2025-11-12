import type { CompleteRecordInterface } from './complete-record.type';

export type ListRecordsType = Pick<
  CompleteRecordInterface,
  | 'id'
  | 'nickname'
  | 'candidateName'
  | 'typeOfRecord'
  | 'candidatePhone'
  | 'updatedAt'
  | 'isCoupleWork'
  | 'isWork'
  | 'recordPOSl'
  | 'recordPOSll'
  | 'recordCouple'
  | 'recordWork'
>;
export interface ListRecordsInterface {
  records?: ListRecordsType[];
  courseNumber: string;
  loading?: boolean;
}
