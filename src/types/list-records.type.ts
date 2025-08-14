import type { RecordCoupleType } from './couple.type';
import type { RecordType } from './generic-types.type';
import type { RecordPOSlType } from './posl.type';
import type { RecordPOSllType } from './posll.type';
import type { RecordWorkType } from './work.type';

export type ListRecordsType = {
  id: string;
  nickname: string;
  candidateName: string;
  typeOfRecord: RecordType;
  candidatePhone: string;
  updatedAt: string;
  recordPOSl?: RecordPOSlType;
  recordPOSll?: RecordPOSllType;
  recordWork?: RecordWorkType;
  recordCouple?: RecordCoupleType;
};

export interface ListRecordsInterface {
  records?: ListRecordsType[];
  courseNumber: string;
}
