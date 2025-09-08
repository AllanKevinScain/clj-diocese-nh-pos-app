'use client';

import type { InferType } from 'yup';

import type { backgroundTableSchema, exportWorkTableSchema } from '@/yup';

type BackgroundTableSchemaInferType = InferType<typeof backgroundTableSchema>;
type ExportWorkTableSchemaInferType = InferType<typeof exportWorkTableSchema>;

export function useWorkTable() {
  async function registerWorkTable(props: BackgroundTableSchemaInferType) {
    const req = await fetch('/api/work-table', {
      method: 'POST',
      body: JSON.stringify(props),
    });
    const res = await req.json();
    return res;
  }
  async function updateWorkTable(props: BackgroundTableSchemaInferType) {
    const req = await fetch('/api/work-table', {
      method: 'PUT',
      body: JSON.stringify(props),
    });
    const res = await req.json();
    return res;
  }
  async function getWorkTableByCourseNumber(props: ExportWorkTableSchemaInferType) {
    const req = await fetch(`/api/work-table/archive-data/${props.courseNumber}`, {
      method: 'GET',
    });
    const res = await req.json();
    return res;
  }

  return {
    registerWorkTable,
    updateWorkTable,
    getWorkTableByCourseNumber,
  };
}
