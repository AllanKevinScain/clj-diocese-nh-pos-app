import { getRecordCoupleServerCall } from '@/server-calls';
import type { RecordType } from '@/types';

import { EditRecordCoupleClientPage } from './client-page';

interface EditRecordCouplePageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string; typeOfRecord: RecordType }>;
}

export default async function EditRecordCouplePage(props: EditRecordCouplePageInterface) {
  const { searchParams } = props;
  const { id, typeOfRecord } = await searchParams;

  const record = await getRecordCoupleServerCall(id);

  return <EditRecordCoupleClientPage record={record.data} typeOfRecord={typeOfRecord} />;
}
