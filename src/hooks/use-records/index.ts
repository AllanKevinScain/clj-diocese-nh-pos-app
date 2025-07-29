'use client';

import toast from 'react-hot-toast';
import { ValidationError } from 'yup';

import { posllSchema, poslSchema, workSchema } from '@/yup';

import type {
  CallRecordInterface,
  CallRecordReturnInterface,
  UseRecordsInterface,
} from './use-records.type';

export function useRecords() {
  async function _callRecord(props: CallRecordInterface) {
    const { data, api, method } = props;
    const req = await fetch(api, { method, body: JSON.stringify(data) });
    const res = await req.json();
    return res;
  }

  async function registerRecord(props: UseRecordsInterface): Promise<CallRecordReturnInterface> {
    const { typeOfRecord, data } = props;

    try {
      if (typeOfRecord === 'POSl') {
        await poslSchema.validate(data, { abortEarly: false });
        await _callRecord({ data, api: '/api/records/posl', method: 'POST' });
      }
      if (typeOfRecord === 'POSll') {
        await posllSchema.validate(data, { abortEarly: false });
        await _callRecord({ data: data, api: '/api/records/posll', method: 'POST' });
      }
      if (typeOfRecord === 'WORK') {
        await workSchema.validate(data, { abortEarly: false });
        await _callRecord({ data: data, api: '/api/records/work', method: 'POST' });
      }
      return { ok: false, data: { message: 'Falha no cadastro!' } };
    } catch (error) {
      if (error instanceof ValidationError) {
        const message = error.inner.map((e) => `${e.path}: ${e.message}`).join('\n');
        toast.error(message, { duration: 5000 });

        throw new Error(message);
      }

      throw error;
    }
  }
  async function editRecord(props: UseRecordsInterface): Promise<CallRecordReturnInterface> {
    const { typeOfRecord, data } = props;

    try {
      if (typeOfRecord === 'POSl') {
        await poslSchema.validate(data, { abortEarly: false });
        await _callRecord({ data, api: '/api/records/posl', method: 'POST' });
      }
      if (typeOfRecord === 'POSll') {
        await posllSchema.validate(data, { abortEarly: false });
        await _callRecord({ data: data, api: '/api/records/posll', method: 'POST' });
      }
      if (typeOfRecord === 'WORK') {
        await workSchema.validate(data, { abortEarly: false });
        await _callRecord({ data: data, api: '/api/records/work', method: 'POST' });
      }
      return { ok: false, data: { message: 'Falha na atualização!' } };
    } catch (error) {
      if (error instanceof ValidationError) {
        const message = error.inner.map((e) => `${e.path}: ${e.message}`).join('\n');
        toast.error(message, { duration: 5000 });

        throw new Error(message);
      }

      throw error;
    }
  }

  async function deleteRecordById(
    recordId: string,
    typeOfRecord: 'POSl' | 'POSll' | 'WORK' | 'COUPLE_WORK',
  ) {
    const req = await fetch(`/api/records?recordId=${recordId}&typeOfRecord=${typeOfRecord}`, {
      method: 'DELETE',
    });
    const res = await req.json();
    return res;
  }

  return {
    registerRecord,
    editRecord,
    deleteRecordById,
  };
}
