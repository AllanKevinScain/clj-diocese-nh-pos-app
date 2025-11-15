import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import type { FunctionType } from '@/types';

import {
  RegisterRecordCoupleClientPage,
  RegisterRecordPosllClientPage,
  RegisterRecordWorkClientPage,
} from '../../components/register-client-pages';

interface RegisterRecordPageInterface {
  params: Promise<{ courseNumber: string }>;
  searchParams: Promise<{ FT: FunctionType }>;
}

export default async function RegisterRecordPage(props: RegisterRecordPageInterface) {
  const { searchParams, params } = props;
  const { courseNumber } = await params;
  const { FT } = await searchParams;

  const data = await getServerSession(authOptions);

  if (FT === 'WORK') {
    return (
      <RegisterRecordWorkClientPage
        courseNumber={courseNumber}
        session={data}
        typeOfRecord="POSll"
      />
    );
  }

  if (FT === 'COUPLE') {
    return (
      <RegisterRecordCoupleClientPage
        courseNumber={courseNumber}
        session={data}
        typeOfRecord="POSll"
      />
    );
  }

  return <RegisterRecordPosllClientPage courseNumber={courseNumber} session={data} />;
}
