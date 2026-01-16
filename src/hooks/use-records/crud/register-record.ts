import type { CompleteRecordInterface } from '@/types';
import { candidatePoslllSchema, coupleSchema, posllSchema, poslSchema, workSchema } from '@/yup';

import { callRecord } from './helper';

export async function registerPoslRecord(data: CompleteRecordInterface) {
  if (data.isWork) {
    const validateData = await workSchema.validate(data, { abortEarly: false });
    return callRecord({ data: validateData, api: '/api/records/posl/work', method: 'POST' });
  }
  if (data.isCoupleWork) {
    const validateData = await coupleSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/posl/couple',
      method: 'POST',
    });
  }

  const validateData = await poslSchema.validate(data, { abortEarly: false });
  return callRecord({ data: validateData, api: '/api/records/posl', method: 'POST' });
}

export async function registerPosllRecord(data: CompleteRecordInterface) {
  if (data.isWork) {
    const validateData = await workSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/posll/work',
      method: 'POST',
    });
  }
  if (data.isCoupleWork) {
    const validateData = await coupleSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/posll/couple',
      method: 'POST',
    });
  }

  const validateData = await posllSchema.validate(data, { abortEarly: false });
  return callRecord({ data: validateData, api: '/api/records/posll', method: 'POST' });
}

export async function registerPoslllRecord(data: CompleteRecordInterface) {
  if (data.isWork) {
    const validateData = await workSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/poslll/work',
      method: 'POST',
    });
  }
  if (data.isCoupleWork) {
    const validateData = await coupleSchema.validate(data, { abortEarly: false });
    return callRecord({
      data: validateData,
      api: '/api/records/poslll/couple',
      method: 'POST',
    });
  }

  const validateData = await candidatePoslllSchema.validate(data, { abortEarly: false });
  return callRecord({ data: validateData, api: '/api/records/poslll', method: 'POST' });
}
