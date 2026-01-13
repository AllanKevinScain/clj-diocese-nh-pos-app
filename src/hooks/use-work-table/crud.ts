import type { BackgroundTableSchemaInferType, ExportWorkTableSchemaInferType } from '@/yup';

export async function registerWorkTable(props: BackgroundTableSchemaInferType) {
  const req = await fetch('/api/work-table', {
    method: 'POST',
    body: JSON.stringify(props),
  });
  const res = await req.json();
  return res;
}
export async function updateWorkTable(props: BackgroundTableSchemaInferType) {
  const req = await fetch('/api/work-table', {
    method: 'PUT',
    body: JSON.stringify(props),
  });
  const res = await req.json();
  return res;
}
export async function getWorkTableByCourseId(props: ExportWorkTableSchemaInferType) {
  const req = await fetch(`/api/work-table/archive-data/${props.id}`, {
    method: 'GET',
  });
  const res = await req.json();
  return res;
}
