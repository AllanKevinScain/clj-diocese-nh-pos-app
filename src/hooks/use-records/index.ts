'use client';

import toast from 'react-hot-toast';
import { ValidationError } from 'yup';

import { poslSchema } from '@/yup';

import type { UseRecordsInterface } from './use-records.type';

export function useRecords() {
  async function registerRecord(props: UseRecordsInterface) {
    const { typeOfRecord } = props;

    try {
      if (typeOfRecord === 'POSl') {
        await poslSchema.validate(props.data, { abortEarly: false });
      }

      const req = await fetch('/api/records', {
        method: 'POST',
        body: JSON.stringify(props.data),
      });

      const res = await req.json();
      return res;
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
      }

      const req = await fetch('/api/records', {
        method: 'PUT',
        body: JSON.stringify(props.data),
      });

      const res = await req.json();
      return res;
    } catch (error) {
      if (error instanceof ValidationError) {
        const message = error.inner.map((e) => `${e.path}: ${e.message}`).join('\n');
        toast.error(message, { duration: 5000 });

        throw new Error(message);
      }

      throw error;
    }
  }

  async function deleteRecordById(recordId: string) {
    const req = await fetch(`/api/records/delete-posl?recordId=${recordId}`, {
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
