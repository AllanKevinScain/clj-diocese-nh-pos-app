'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ValidationError } from 'yup';

import { coupleSchema, posllSchema, poslSchema, workSchema } from '@/yup';

import type {
  CallRecordInterface,
  CallRecordReturnInterface,
  GetRecordByIdReturnInterface,
  UseRecordsInterface,
} from './use-records.type';

export function useRecords() {
  const router = useRouter();
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
        const validateData = await poslSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: validateData, api: '/api/records/posl', method: 'POST' });
      }
      if (typeOfRecord === 'POSll') {
        const validateData = await posllSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: validateData, api: '/api/records/posll', method: 'POST' });
      }
      if (typeOfRecord === 'WORK') {
        const validateData = await workSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: validateData, api: '/api/records/work', method: 'POST' });
      }
      if (typeOfRecord === 'COUPLE_WORK') {
        const validateData = await coupleSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: validateData, api: '/api/records/couple', method: 'POST' });
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
  const mutationRegisterRecord = useMutation({
    mutationKey: ['registerRecord'],
    mutationFn: registerRecord,
    onSuccess: (e) => {
      if (!e?.ok) {
        toast.error(e.data.message);
      } else {
        toast.success(e.data.message);
        if (e.data.data) {
          router.push(
            `/courses/${e.data.data.courseNumber}/${e.data.data.typeOfRecord.toLowerCase()}`,
          );
        } else {
          router.push('/courses');
        }
      }
    },
    onError: (e) => {
      toast.error(JSON.stringify(e));
    },
  });

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
      if (typeOfRecord === 'COUPLE_WORK') {
        console.log('🚀 ~ editRecord ~ typeOfRecord:', typeOfRecord);
        await coupleSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: data, api: '/api/records/couple', method: 'PUT' });
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
  const mutationEditRecord = useMutation({
    mutationKey: ['editRecord'],
    mutationFn: editRecord,
    onSuccess: (e) => {
      if (!e?.ok) {
        toast.error(e.data.message);
      } else {
        toast.success(e.data.message);
        if (e.data.data) {
          router.push(
            `/courses/${e.data.data.courseNumber}/${e.data.data.typeOfRecord.toLowerCase()}`,
          );
        } else {
          router.push('/courses');
        }
      }
    },
    onError: (e) => {
      toast.error(JSON.stringify(e));
    },
  });
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
  async function getRecordById(id: string): Promise<GetRecordByIdReturnInterface> {
    const req = await fetch(`/api/record-by-id/${id}`, {
      method: 'GET',
    });
    const res = await req.json();
    return res;
  }

  return {
    registerRecord: mutationRegisterRecord.mutateAsync,
    editRecord: mutationEditRecord.mutateAsync,
    deleteRecordById,
    getRecordById,
  };
}
