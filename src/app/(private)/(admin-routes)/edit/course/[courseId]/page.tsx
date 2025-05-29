import dayjs from 'dayjs';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';

import { EditCourseClientPage } from './client-page';

async function fullUrl() {
  const headersList = headers();
  const host = (await headersList).get('host');
  const protocol = (await headersList).get('x-forwarded-proto') || 'http';
  return `${protocol}://${host}`;
}

interface EditCoursePageInterface {
  params: Promise<{ courseId: string }>;
}

export default async function EditCoursePage(props: EditCoursePageInterface) {
  const { params } = props;
  const { courseId } = await params;
  const session = await getServerSession(authOptions);

  if (session && session.accessToken && courseId) {
    const url = await fullUrl();
    const response = await fetch(`${url}/api/course?courseId=${courseId}`, {
      method: 'GET',
      headers: { authorization: session.accessToken },
    });
    const data = await response.json();

    const formatedData = {
      ...data.data,
      startDate: dayjs(data.data.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(data.data.endDate).format('YYYY-MM-DD'),
    };

    if (data.ok) {
      return <EditCourseClientPage course={formatedData} />;
    }
  }

  redirect('/courses');
}
