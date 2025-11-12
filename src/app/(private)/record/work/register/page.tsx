import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import type { RecordType } from '@/types';

import { RegisterRecordWorkClientPage } from './client-page';

interface RegisterRecordWorkPageInterface {
  params: Promise<unknown>;
  searchParams: Promise<{ courseNumber: string; typeOfRecord: RecordType }>;
}

export default async function RegisterRecordWorkPage(props: RegisterRecordWorkPageInterface) {
  const { searchParams } = props;
  const { courseNumber, typeOfRecord } = await searchParams;

  const data = await getServerSession(authOptions);

  return (
    <RegisterRecordWorkClientPage
      courseNumber={courseNumber}
      session={data}
      typeOfRecord={typeOfRecord}
    />
  );
}
