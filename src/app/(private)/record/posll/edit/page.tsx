import { getRecordPosllServerCall } from '@/server-calls';

import { EditRecordPosllClientPage } from './client-page';

interface EditRecordPosllPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function EditRecordPosllPage(props: EditRecordPosllPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordPosllServerCall(id);

  return <EditRecordPosllClientPage record={record.data} />;
}
