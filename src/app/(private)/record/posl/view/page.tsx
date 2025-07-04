import { getRecordById } from '../server-call';
import { ViewRecordPoslClientPage } from './client-page';

interface ViewRecordPoslPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function ViewRecordPoslPage(props: ViewRecordPoslPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordById(id);

  return <ViewRecordPoslClientPage record={record.data} />;
}
