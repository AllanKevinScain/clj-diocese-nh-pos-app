import type { RecordType } from '@/types';

export interface UseRecordsInterface {
  typeOfRecord: RecordType;
  data: unknown;
}

export interface CallRecordInterface extends Pick<UseRecordsInterface, 'data'> {
  method: 'POST' | 'PUT';
  api: '/api/records/posl' | '/api/records/posll' | '/api/records/work' | '/api/records/couple';
}
export interface CallRecordReturnInterface {
  ok?: boolean;
  data: { message: string };
}
