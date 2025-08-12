import { RegisterRecordCoupleClientPage } from './client-page';

interface RegisterRecordCouplePageInterface {
  params: Promise<unknown>;
  searchParams: Promise<{ courseNumber: string }>;
}

export default async function RegisterRecordCouplePage(props: RegisterRecordCouplePageInterface) {
  const { searchParams } = props;
  const { courseNumber } = await searchParams;

  return <RegisterRecordCoupleClientPage courseNumber={courseNumber} />;
}
