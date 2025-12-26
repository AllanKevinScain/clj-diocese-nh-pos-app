'use client';
import { isEmpty } from 'lodash';

import type { CompleteRecordInterface } from '@/types';

export type FilterSchemaInfertype = Partial<
  Omit<CompleteRecordInterface, 'recordPOSl' | 'recordPOSll' | 'recordWork' | 'recordCouple'>
> & { search?: string | null };

export function useListRecords() {
  async function listAllRecords(values: FilterSchemaInfertype) {
    const filterValues = Object.entries(values).filter((entry) => !isEmpty(entry[1])) as [
      string,
      string,
    ][];
    const transforForObject = Object.fromEntries(filterValues);
    const searchParams = new URLSearchParams(transforForObject);
    const queryString = searchParams.toString();

    const req = await fetch(`/api/records/list-all/?${queryString}`, {
      method: 'GET',
    });
    const data = await req.json();

    return data;
  }

  async function listRecordByCourseId(courseId: string) {
    const res = await fetch(`/api/records/list-by-course-id/${courseId}`, {
      method: 'GET',
    });
    const data = await res.json();

    return data.data;
  }

  return {
    listAllRecords,
    listRecordByCourseId,
  };
}
