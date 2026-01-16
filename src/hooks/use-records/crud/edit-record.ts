import type { CompleteRecordInterface } from '@/types';
import { candidatePoslllSchema, coupleSchema, posllSchema, poslSchema, workSchema } from '@/yup';

import { callRecord } from './helper';

export async function editPoslRecord(data: CompleteRecordInterface) {
  if (data.isWork) {
    const validateData = await workSchema.validate(data, { abortEarly: false });
    return callRecord({ data: validateData, api: '/api/records/posl/work', method: 'PUT' });
  }
  if (data.isCoupleWork) {
    const validateData = await coupleSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/posl/couple',
      method: 'PUT',
    });
  }

  await poslSchema.validate(data, { abortEarly: false });
  return callRecord({ data, api: '/api/records/posl', method: 'PUT' });
}

export async function editPosllRecord(data: CompleteRecordInterface) {
  if (data.isWork) {
    const validateData = await workSchema.validate(data, { abortEarly: false });
    return callRecord({ data: validateData, api: '/api/records/posll/work', method: 'PUT' });
  }
  if (data.isCoupleWork) {
    const validateData = await coupleSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/posll/couple',
      method: 'PUT',
    });
  }

  await posllSchema.validate(data, { abortEarly: false });
  return callRecord({ data: data, api: '/api/records/posll', method: 'PUT' });
}

export async function editPoslllRecord(data: CompleteRecordInterface) {
  if (data.isWork) {
    const validateData = await workSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/poslll/work',
      method: 'PUT',
    });
  }
  if (data.isCoupleWork) {
    const validateData = await coupleSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/poslll/couple',
      method: 'PUT',
    });
  }

  await candidatePoslllSchema.validate(data, { abortEarly: false });
  return callRecord({ data: data, api: '/api/records/poslll', method: 'PUT' });
}
