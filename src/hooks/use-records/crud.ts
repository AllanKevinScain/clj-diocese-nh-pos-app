import toast from 'react-hot-toast';
import { ValidationError } from 'yup';

import type { CompleteRecordInterface } from '@/types';
import { candidatePoslllSchema, coupleSchema, posllSchema, poslSchema, workSchema } from '@/yup';

import type {
  CallRecordInterface,
  CallRecordReturnInterface,
  UseRecordsInterface,
} from './use-records.type';

async function _callRecord(props: CallRecordInterface) {
  const { data, api, method } = props;
  try {
    const req = await fetch(api, { method, body: JSON.stringify(data) });
    const res = await req.json();

    if (!req.ok) {
      throw new Error(res?.data?.message || 'Erro na requisição');
    }

    return res;
  } catch (error) {
    throw error;
  }
}

export async function registerRecord(
  props: UseRecordsInterface,
): Promise<CallRecordReturnInterface> {
  const { typeOfRecord, data } = props;

  try {
    if (typeOfRecord === 'POSl') {
      if (data.isWork) {
        const validateData = await workSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: validateData, api: '/api/records/posl/work', method: 'POST' });
      }
      if (data.isCoupleWork) {
        const validateData = await coupleSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/posl/couple',
          method: 'POST',
        });
      }

      const validateData = await poslSchema.validate(data, { abortEarly: false });
      return _callRecord({ data: validateData, api: '/api/records/posl', method: 'POST' });
    }
    if (typeOfRecord === 'POSll') {
      if (data.isWork) {
        const validateData = await workSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/posll/work',
          method: 'POST',
        });
      }
      if (data.isCoupleWork) {
        const validateData = await coupleSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/posll/couple',
          method: 'POST',
        });
      }

      const validateData = await posllSchema.validate(data, { abortEarly: false });
      return _callRecord({ data: validateData, api: '/api/records/posll', method: 'POST' });
    }
    if (typeOfRecord === 'POSlll') {
      if (data.isWork) {
        const validateData = await workSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/poslll/work',
          method: 'POST',
        });
      }
      if (data.isCoupleWork) {
        const validateData = await coupleSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/poslll/couple',
          method: 'POST',
        });
      }

      const validateData = await candidatePoslllSchema.validate(data, { abortEarly: false });
      return _callRecord({ data: validateData, api: '/api/records/poslll', method: 'POST' });
    }

    return { ok: false, data: { message: 'Falha no cadastro!' } };
  } catch (error) {
    if (error instanceof ValidationError) {
      const message = error.inner.map((e) => `${e.path}: ${e.message}`).join('\n');
      toast.error(message, { duration: 5000 });

      return { ok: false, data: { message } };
    }

    toast.error('Erro inesperado ao validar os dados');
    return { ok: false, data: { message: 'Falha no cadastro!' } };
  }
}

export async function editRecord(props: UseRecordsInterface): Promise<CallRecordReturnInterface> {
  const { data } = props;

  try {
    if (data.typeOfRecord === 'POSl') {
      if (data.isWork) {
        const validateData = await workSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: validateData, api: '/api/records/posl/work', method: 'PUT' });
      }
      if (data.isCoupleWork) {
        const validateData = await coupleSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/posl/couple',
          method: 'PUT',
        });
      }

      await poslSchema.validate(data, { abortEarly: false });
      return _callRecord({ data, api: '/api/records/posl', method: 'PUT' });
    }
    if (data.typeOfRecord === 'POSll') {
      if (data.isWork) {
        const validateData = await workSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: validateData, api: '/api/records/posll/work', method: 'PUT' });
      }
      if (data.isCoupleWork) {
        const validateData = await coupleSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/posll/couple',
          method: 'PUT',
        });
      }

      await posllSchema.validate(data, { abortEarly: false });
      return _callRecord({ data: data, api: '/api/records/posll', method: 'PUT' });
    }
    if (data.typeOfRecord === 'POSlll') {
      if (data.isWork) {
        const validateData = await workSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/poslll/work',
          method: 'PUT',
        });
      }
      if (data.isCoupleWork) {
        const validateData = await coupleSchema.validate(data, { abortEarly: false });
        return _callRecord({
          data: validateData,
          api: '/api/records/poslll/couple',
          method: 'PUT',
        });
      }

      await candidatePoslllSchema.validate(data, { abortEarly: false });
      return _callRecord({ data: data, api: '/api/records/poslll', method: 'PUT' });
    }

    return { ok: false, data: { message: 'Falha na atualização!' } };
  } catch (error) {
    if (error instanceof ValidationError) {
      const message = error.inner.map((e) => `${e.path}: ${e.message}`).join('\n');
      toast.error(message, { duration: 5000 });

      return { ok: false, data: { message } };
    }

    toast.error('Erro inesperado ao validar os dados');
    return { ok: false, data: { message: 'Falha no cadastro!' } };
  }
}

export async function deleteRecordById(props: Pick<CompleteRecordInterface, 'id'>) {
  const { id } = props;
  const req = await fetch(`/api/records?recordId=${id}`, {
    method: 'DELETE',
  });
  const res = await req.json();
  return res;
}
