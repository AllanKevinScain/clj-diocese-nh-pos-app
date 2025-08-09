import { getPoslRecordServerCall } from '@/server-calls';

import { EditRecordPoslClientPage } from './client-page';

interface EditRecordPoslPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function EditRecordPoslPage(props: EditRecordPoslPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getPoslRecordServerCall(id);

  return <EditRecordPoslClientPage record={record.data} />;
}
