import { getRecordByIdServerCall } from '@/server-calls';

import { EditRecordCoupleClientPage } from './couple-work-client-page';
import { EditRecordPoslClientPage } from './posl-client-page';
import { EditRecordPosllClientPage } from './posll-client-page';
import { EditRecordWorkClientPage } from './work-client-page';

interface EditRecordPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function EditRecordPage(props: EditRecordPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordByIdServerCall(id);

  if (record.data.isCoupleWork) return <EditRecordCoupleClientPage record={record.data} />;
  if (record.data.isWork) return <EditRecordWorkClientPage record={record.data} />;
  if (record.data.typeOfRecord === 'POSll') {
    return <EditRecordPosllClientPage record={record.data} />;
  }

  return <EditRecordPoslClientPage record={record.data} />;
}
