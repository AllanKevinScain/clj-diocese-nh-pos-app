import { RegisterRecordWorkClientPage } from './client-page';

interface RegisterRecordWorkPageInterface {
  params: Promise<unknown>;
  searchParams: Promise<{ courseNumber: string }>;
}

export default async function RegisterRecordWorkPage(props: RegisterRecordWorkPageInterface) {
  const { searchParams } = props;
  const { courseNumber } = await searchParams;

  return <RegisterRecordWorkClientPage courseNumber={courseNumber} />;
}
