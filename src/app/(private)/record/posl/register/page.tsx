import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';

import { RegisterRecordPoslClientPage } from './client-page';

interface RegisterRecordPoslPageInterface {
  params: Promise<unknown>;
  searchParams: Promise<{ courseNumber: string }>;
}

export default async function RegisterRecordPoslPage(props: RegisterRecordPoslPageInterface) {
  const { searchParams } = props;
  const { courseNumber } = await searchParams;

  const data = await getServerSession(authOptions);

  return <RegisterRecordPoslClientPage courseNumber={courseNumber} session={data} />;
}
