'use client';
import { isEmpty } from 'lodash';
import type * as yup from 'yup';

import type { filterRecordsSchema } from '@/yup';

export type FilterSchemaInfertype = yup.InferType<typeof filterRecordsSchema>;

export function useListRecords() {
  async function listRecordsByCourseNumber(courseNumber: string) {
    const req = await fetch(`/api/records/list-by-number/${courseNumber}`, {
      method: 'GET',
    });
    const res = await req.json();

    return res.data;
  }

  async function listAllRecords(values: FilterSchemaInfertype) {
    const filterValues = Object.entries(values).filter((entry) => !isEmpty(entry[1]));
    const transforForObject = Object.fromEntries(filterValues);
    const searchParams = new URLSearchParams(transforForObject);
    const queryString = searchParams.toString();

    const req = await fetch(`/api/records/list-all/?${queryString}`, {
      method: 'GET',
    });
    const data = await req.json();

    return data;
  }

  return {
    listRecordsByCourseNumber,
    listAllRecords,
  };
}
