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

  async function registerRecord(props: UseRecordsInterface): Promise<CallRecordReturnInterface> {
    const { typeOfRecord, data } = props;

    try {
      if (typeOfRecord === 'POSl') {
        await poslSchema.validate(data, { abortEarly: false });
        return _callRecord({ data, api: '/api/records/posl', method: 'POST' });
      }
      if (typeOfRecord === 'POSll') {
        await posllSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: data, api: '/api/records/posll', method: 'POST' });
      }
      if (typeOfRecord === 'WORK') {
        await workSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: data, api: '/api/records/work', method: 'POST' });
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
  async function editRecord(props: UseRecordsInterface): Promise<CallRecordReturnInterface> {
    const { typeOfRecord, data } = props;

    try {
      if (typeOfRecord === 'POSl') {
        await poslSchema.validate(data, { abortEarly: false });
        return _callRecord({ data, api: '/api/records/posl', method: 'PUT' });
      }
      if (typeOfRecord === 'POSll') {
        await posllSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: data, api: '/api/records/posll', method: 'PUT' });
      }
      if (typeOfRecord === 'WORK') {
        await workSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: data, api: '/api/records/work', method: 'PUT' });
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
