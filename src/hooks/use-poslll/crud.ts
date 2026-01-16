import { identifyStatusError } from '@/helpers';
import type { PoslllSchemaInferType } from '@/yup';

export async function registerPoslll(props: PoslllSchemaInferType) {
  const req = await fetch('/api/poslll', {
    method: 'POST',
    body: JSON.stringify(props),
  });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}
export async function updatePoslll(props: PoslllSchemaInferType) {
  const { id, ...rest } = props;
  const req = await fetch(`/api/poslll?poslllId=${id}`, {
    method: 'PUT',
    body: JSON.stringify(rest),
  });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}
export async function changeStatusPoslll(poslllId: string) {
  const req = await fetch(`/api/poslll?poslllId=${poslllId}`, {
    method: 'PATCH',
  });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}
export async function getPoslllById(
  id: string,
): Promise<{ ok: boolean; data: PoslllSchemaInferType }> {
  const req = await fetch(`/api/poslll/${id}`, {
    method: 'GET',
  });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}
