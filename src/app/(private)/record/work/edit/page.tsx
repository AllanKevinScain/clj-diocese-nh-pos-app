import { getRecordById } from '../server-call';
import { EditRecordWorkClientPage } from './client-page';

interface EditRecordWordPageInterface {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ id: string }>;
}

export default async function EditRecordWorkPage(props: EditRecordWordPageInterface) {
  const { searchParams } = props;
  const { id } = await searchParams;

  const record = await getRecordById(id);

  return <EditRecordWorkClientPage record={record.data} />;
}
