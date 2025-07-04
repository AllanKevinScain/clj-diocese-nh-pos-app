import { RegisterRecordPosllClientPage } from './client-page';

interface RegisterRecordPosllPageInterface {
  params: Promise<unknown>;
  searchParams: Promise<{ courseNumber: string }>;
}

export default async function RegisterRecordPosllPage(props: RegisterRecordPosllPageInterface) {
  const { searchParams } = props;
  const { courseNumber } = await searchParams;

  return <RegisterRecordPosllClientPage courseNumber={courseNumber} />;
}
