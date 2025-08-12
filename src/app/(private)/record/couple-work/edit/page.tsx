import { getRecordCoupleServerCall } from '@/server-calls';

import { EditRecordCoupleClientPage } from './client-page';

interface EditRecordCouplePageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function EditRecordCouplePage(props: EditRecordCouplePageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordCoupleServerCall(id);

  return <EditRecordCoupleClientPage record={record.data} />;
}
