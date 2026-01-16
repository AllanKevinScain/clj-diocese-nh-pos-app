import { isEmpty } from 'lodash';

import type { ParishesSchemaInferType } from '@/yup';

import type { ListParishesReturnInterface, ListUsersReturnInterface } from './use-users.type';

export async function listUsers(): Promise<ListUsersReturnInterface> {
  const req = await fetch('/api/user/list', { method: 'GET' });
  const res = await req.json();
  return res;
}

export async function listParishes(): Promise<ListParishesReturnInterface> {
  const req = await fetch('/api/user/list-parishes', { method: 'GET' });
  const res = await req.json();

  if (res.ok && !isEmpty(res?.data)) {
    return {
      ...res,
      data: res?.data.map((parish: ParishesSchemaInferType) => ({
        label: parish.coName,
        value: parish.coName,
      })),
    };
  }

  return res;
}
