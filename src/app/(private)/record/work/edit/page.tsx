import { getRecordWorkServerCall } from '@/server-calls';
import type { RecordType } from '@/types';

import { EditRecordWorkClientPage } from './client-page';

interface EditRecordWordPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string; typeOfRecord: RecordType }>;
}

export default async function EditRecordWorkPage(props: EditRecordWordPageInterface) {
  const { searchParams } = props;
  const { id, typeOfRecord } = await searchParams;

  const record = await getRecordWorkServerCall(id);

  return <EditRecordWorkClientPage record={record.data} typeOfRecord={typeOfRecord} />;
}
