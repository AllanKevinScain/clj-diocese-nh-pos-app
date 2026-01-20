export interface CallRecordInterface {
  method: 'POST' | 'PUT';
  api:
    | '/api/records/posl'
    | '/api/records/posll'
    | '/api/records/posl/work'
    | '/api/records/posl/couple'
    | '/api/records/posll/work'
    | '/api/records/posll/couple'
    | '/api/records/poslll'
    | '/api/records/poslll/work'
    | '/api/records/poslll/couple';
  data: unknown;
}
