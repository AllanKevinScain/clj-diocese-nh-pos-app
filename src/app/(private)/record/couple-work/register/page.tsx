import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import type { RecordType } from '@/types';

import { RegisterRecordCoupleClientPage } from './client-page';

interface RegisterRecordCouplePageInterface {
  params: Promise<unknown>;
  searchParams: Promise<{ courseNumber: string; typeOfRecord: RecordType }>;
}

export default async function RegisterRecordCouplePage(props: RegisterRecordCouplePageInterface) {
  const { searchParams } = props;
  const { courseNumber, typeOfRecord } = await searchParams;

  const data = await getServerSession(authOptions);

  return (
    <RegisterRecordCoupleClientPage
      courseNumber={courseNumber}
      session={data}
      typeOfRecord={typeOfRecord}
    />
  );
}
