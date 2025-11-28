import { getRecordByIdServerCall } from '@/server-calls';

import { ViewRecordCoupleClientPage } from './couple-work-client-page';
import { ViewRecordPoslClientPage } from './posl-client-page';
import { ViewRecordPosllClientPage } from './posll-client-page';
import { ViewRecordPoslllClientPage } from './poslll-client-page';
import { ViewRecordWorkClientPage } from './work-client-page';

interface ViewRecordPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function ViewRecordPage(props: ViewRecordPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordByIdServerCall(id);

  if (record.data.isWork) return <ViewRecordWorkClientPage record={record.data} />;
  if (record.data.isCoupleWork) return <ViewRecordCoupleClientPage record={record.data} />;
  if (record.data.typeOfRecord === 'POSll') {
    return <ViewRecordPosllClientPage record={record.data} />;
  }
  if (record.data.typeOfRecord === 'POSlll') {
    return <ViewRecordPoslllClientPage record={record.data} />;
  }

  return <ViewRecordPoslClientPage record={record.data} />;
}
