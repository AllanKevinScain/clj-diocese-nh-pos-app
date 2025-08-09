import { getRecordWorkServerCall } from '@/server-calls';

import { ViewRecordWorkClientPage } from './client-page';

interface ViewRecordWorkPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function ViewRecordWorkPage(props: ViewRecordWorkPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordWorkServerCall(id);

  return <ViewRecordWorkClientPage record={record.data} />;
}
