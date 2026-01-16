import { identifyStatusError } from '@/helpers';

import type { CallRecordInterface } from '../use-records.type';

export async function callRecord(props: CallRecordInterface) {
  const { data, api, method } = props;
  const req = await fetch(api, { method, body: JSON.stringify(data) });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}
