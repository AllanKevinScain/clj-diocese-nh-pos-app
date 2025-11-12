import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';

import { RegisterRecordPosllClientPage } from './client-page';

interface RegisterRecordPosllPageInterface {
  params: Promise<unknown>;
  searchParams: Promise<{ courseNumber: string }>;
}

export default async function RegisterRecordPosllPage(props: RegisterRecordPosllPageInterface) {
  const { searchParams } = props;
  const { courseNumber } = await searchParams;

  const data = await getServerSession(authOptions);

  return <RegisterRecordPosllClientPage courseNumber={courseNumber} session={data} />;
}
