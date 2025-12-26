import { MontageProvider } from '@/providers';
import { getCourseServerCall, getWorkTableServerCall } from '@/server-calls';

import { MontageClientPage } from './client-page';

interface MontagePageInterface {
  params: Promise<{ courseId: string }>;
}

export default async function MontagePage(props: MontagePageInterface) {
  const { params } = props;
  const { courseId } = await params;

  const workTable = await getWorkTableServerCall(courseId);
  const course = await getCourseServerCall(courseId);

  return (
    <MontageProvider courseId={courseId}>
      <MontageClientPage course={course.data} workTable={workTable.data} />
    </MontageProvider>
  );
}
