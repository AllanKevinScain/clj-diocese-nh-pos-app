import { getRecordCoupleServerCall } from '@/server-calls';

import { ViewRecordCoupleClientPage } from './client-page';

interface ViewRecordCouplePageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function ViewRecordCouplePage(props: ViewRecordCouplePageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordCoupleServerCall(id);

  return <ViewRecordCoupleClientPage record={record.data} />;
}
