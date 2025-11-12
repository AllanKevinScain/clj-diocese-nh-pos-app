import type { CompleteRecordInterface, RecordType } from '@/types';

export interface UseRecordsInterface {
  typeOfRecord: RecordType;
  data: CompleteRecordInterface;
}

export interface CallRecordInterface {
  method: 'POST' | 'PUT';
  api:
    | '/api/records/posl'
    | '/api/records/posll'
    | '/api/records/posl/work'
    | '/api/records/posl/couple'
    | '/api/records/posll/work'
    | '/api/records/posll/couple';
  data: unknown;
}
export interface CallRecordReturnInterface {
  ok?: boolean;
  data: { message: string; data?: CompleteRecordInterface };
}
