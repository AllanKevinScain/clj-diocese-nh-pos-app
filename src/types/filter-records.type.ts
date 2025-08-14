import type { RecordCoupleType } from './couple.type';
import type { RecordType } from './generic-types.type';
import type { RecordPOSlType } from './posl.type';
import type { RecordPOSllType } from './posll.type';
import type { RecordWorkType } from './work.type';

export type RecordFilterType = {
  id: string;
  typeOfRecord: RecordType;
  courseNumber: string;
  parishAcronym: string;
  recordNumber: string;
  candidateName: string;
  nickname: string;
  birthDate: string;
  candidatePhone: string;
  instagram: string;
  priest: string;
  parishChapel: string;
  spiritualLife: string[];
  observationsCoordinator: string;
  observationsDed: string;
  disease: string | null;
  medication: string | null;
  allergy: string | null;
  dataConsent: true;
  createdAt: string;
  updatedAt: string;
  recordPOSl?: RecordPOSlType;
  recordPOSll?: RecordPOSllType;
  recordWork?: RecordWorkType;
  recordCouple?: RecordCoupleType;
};

export type FilterRecordsType = {
  ok: boolean;
  data: RecordFilterType[];
};
