import { RegisterRecordPoslClientPage } from './client-page';

interface RegisterRecordPoslPageInterface {
  params: Promise<unknown>;
  searchParams: Promise<{ courseNumber: string }>;
}

export default async function RegisterRecordPoslPage(props: RegisterRecordPoslPageInterface) {
  const { searchParams } = props;
  const { courseNumber } = await searchParams;

  return <RegisterRecordPoslClientPage courseNumber={courseNumber} />;
}
