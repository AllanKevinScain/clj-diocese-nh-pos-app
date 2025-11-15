'use client';
import { isEmpty } from 'lodash';

import type { CompleteRecordInterface } from '@/types';

export type FilterSchemaInfertype = Partial<
  Omit<CompleteRecordInterface, 'recordPOSl' | 'recordPOSll' | 'recordWork' | 'recordCouple'>
> & { search?: string | null };

type FilterListWorkCandidateRecordsType = {
  courseNumber: string;
  work?: boolean;
  posl?: boolean;
  posll?: boolean;
  coupleWork?: boolean;
};

export function useListRecords() {
  async function listRecordsByCourseNumber(courseNumber: string) {
    const req = await fetch(`/api/records/list-by-number/${courseNumber}`, {
      method: 'GET',
    });
    const res = await req.json();

    return res.data;
  }

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

  async function listWorkCandidateRecords(values: FilterListWorkCandidateRecordsType) {
    const { courseNumber } = values;
    let url = `/api/records/list-all/?courseNumber=${courseNumber}`;

    if (values.work) {
      url += `&typeOfRecord=WORK`;
    }
    if (values.posl) {
      url += `&typeOfRecord=POSl`;
    }
    if (values.posll) {
      url += `&typeOfRecord=POSll`;
    }
    if (values.coupleWork) {
      url += `&typeOfRecord=COUPLE_WORK`;
    }

    const req = await fetch(url, { method: 'GET' });
    const data = await req.json();

    return data;
  }

  return {
    listRecordsByCourseNumber,
    listAllRecords,
    listWorkCandidateRecords,
  };
}
