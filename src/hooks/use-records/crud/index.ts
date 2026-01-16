import { identifyStatusError } from '@/helpers';
import type { CompleteRecordInterface } from '@/types';

export async function deleteRecordById(props: Pick<CompleteRecordInterface, 'id'>) {
  const { id } = props;
  const req = await fetch(`/api/records?recordId=${id}`, {
    method: 'DELETE',
  });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}

export * from './edit-record';
export * from './register-record';
