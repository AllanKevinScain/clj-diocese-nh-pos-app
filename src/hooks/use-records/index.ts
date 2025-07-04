'use client';

import toast from 'react-hot-toast';
import { ValidationError } from 'yup';

import { posllSchema, poslSchema } from '@/yup';

import type { UseRecordsInterface } from './use-records.type';

export function useRecords() {
  async function registerRecord(props: UseRecordsInterface) {
    const { typeOfRecord } = props;

    try {
      if (typeOfRecord === 'POSl') {
        await poslSchema.validate(props.data, { abortEarly: false });

        const req = await fetch('/api/records/posl', {
          method: 'POST',
          body: JSON.stringify(props.data),
        });

        const res = await req.json();
        return res;
      }

      if (typeOfRecord === 'POSll') {
        await posllSchema.validate(props.data, { abortEarly: false });

        const req = await fetch('/api/records/posll', {
          method: 'POST',
          body: JSON.stringify(props.data),
        });

        const res = await req.json();
        return res;
      }

      return [];
    } catch (error) {
      if (error instanceof ValidationError) {
        const message = error.inner.map((e) => `${e.path}: ${e.message}`).join('\n');
        toast.error(message, { duration: 5000 });

        throw new Error(message);
      }

      throw error;
    }
  }
  async function editRecord(props: UseRecordsInterface) {
    const { typeOfRecord } = props;

    try {
      if (typeOfRecord === 'POSl') {
        await poslSchema.validate(props.data, { abortEarly: false });

        const req = await fetch('/api/records/posl', {
          method: 'PUT',
          body: JSON.stringify(props.data),
        });

        const res = await req.json();
        return res;
      }

      if (typeOfRecord === 'POSll') {
        await posllSchema.validate(props.data, { abortEarly: false });

        const req = await fetch('/api/records/posll', {
          method: 'PUT',
          body: JSON.stringify(props.data),
        });

        const res = await req.json();
        return res;
      }

      return [];
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
    const type = typeOfRecord === 'POSll' ? 'posll' : 'posl';

    const req = await fetch(`/api/records/${type}?recordId=${recordId}`, {
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
