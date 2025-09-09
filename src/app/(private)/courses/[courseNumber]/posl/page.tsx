import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';

import { CourseClientPage } from './client-page';

interface CoursePageInterface {
  params: Promise<{ courseNumber: string }>;
  searchParams: Promise<{ courseId: string }>;
}

export default async function CoursePagePosl(props: CoursePageInterface) {
  const { params, searchParams } = props;
  const { courseNumber } = await params;
  const { courseId } = await searchParams;

  const session = await getServerSession(authOptions);

  return (
    <CourseClientPage
      courseNumber={courseNumber}
      courseId={session?.user.loginType === 'admin' ? courseId : undefined}
    />
  );
}
