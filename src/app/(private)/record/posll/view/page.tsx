import { getRecordPosllServerCall } from '@/server-calls';

import { ViewRecordPosllClientPage } from './client-page';

interface ViewRecordPosllPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function ViewRecordPosllPage(props: ViewRecordPosllPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordPosllServerCall(id);

  return <ViewRecordPosllClientPage record={record.data} />;
}
