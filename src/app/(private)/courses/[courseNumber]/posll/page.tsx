import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';

import { CoursePosllClientPage } from './client-page';

interface CoursePageInterface {
  params: Promise<{ courseNumber: string }>;
  searchParams: Promise<{ courseId: string }>;
}

export default async function CoursePagePosll(props: CoursePageInterface) {
  const { params, searchParams } = props;
  const { courseNumber } = await params;
  const { courseId } = await searchParams;

  const session = await getServerSession(authOptions);

  return (
    <CoursePosllClientPage
      courseNumber={courseNumber}
      courseId={session?.user.loginType === 'admin' ? courseId : undefined}
      typeOfRecord="POSll"
    />
  );
}
