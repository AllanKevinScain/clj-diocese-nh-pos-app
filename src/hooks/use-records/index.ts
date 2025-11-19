'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { ValidationError } from 'yup';

import type { CompleteRecordInterface } from '@/types';
import { candidatePosllSchema, candidatePoslSchema, coupleSchema, workSchema } from '@/yup';

import type {
  CallRecordInterface,
  CallRecordReturnInterface,
  UseRecordsInterface,
} from './use-records.type';

type DeleteRecordByIdPropType = Pick<CompleteRecordInterface, 'id' | 'typeOfRecord'>;

export function useRecords() {
  const router = useRouter();
  const { data: dataSession } = useSession();

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

        const validateData = await candidatePoslSchema.validate(data, { abortEarly: false });
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

        const validateData = await candidatePosllSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: validateData, api: '/api/records/posll', method: 'POST' });
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
        if (e.data.data && dataSession?.user.loginType === 'manager') {
          router.push(`/record/view?id=${e.data.data.id}`);
        } else {
          router.push('/courses');
        }
      }
    },
    onError: (e) => {
      console.log('🚀 ~ useRecords ~ e:', e);
      toast.error(JSON.stringify(e));
    },
  });

  async function editRecord(props: UseRecordsInterface): Promise<CallRecordReturnInterface> {
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

        await candidatePoslSchema.validate(data, { abortEarly: false });
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

        await candidatePosllSchema.validate(data, { abortEarly: false });
        return _callRecord({ data: data, api: '/api/records/posll', method: 'PUT' });
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
        if (e.data.data && dataSession?.user.loginType === 'manager') {
          router.push(
            `/courses/${e.data.data.courseNumber}/${e.data.data.typeOfRecord?.toLowerCase()}`,
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
  async function deleteRecordById(props: DeleteRecordByIdPropType) {
    const { id, typeOfRecord } = props;
    const req = await fetch(`/api/records?recordId=${id}&typeOfRecord=${typeOfRecord}`, {
      method: 'DELETE',
    });
    const res = await req.json();
    return res;
  }

  return {
    registerRecord: mutationRegisterRecord.mutateAsync,
    editRecord: mutationEditRecord.mutateAsync,
    deleteRecordById,
    isFetching: mutationRegisterRecord.isPending || mutationEditRecord.isPending || false,
  };
}
