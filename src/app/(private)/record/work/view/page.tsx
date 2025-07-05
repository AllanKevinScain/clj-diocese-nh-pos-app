import { getRecordById } from '../server-call';
import { ViewRecordWorkClientPage } from './client-page';

interface ViewRecordWorkPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function ViewRecordWorkPage(props: ViewRecordWorkPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordById(id);

  return <ViewRecordWorkClientPage record={record.data} />;
}
