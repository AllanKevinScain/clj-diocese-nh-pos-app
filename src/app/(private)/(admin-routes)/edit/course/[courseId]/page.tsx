import { getCourseServerCall } from '@/server-calls';

import { EditCourseClientPage } from './client-page';

interface EditCoursePageInterface {
  params: Promise<{ courseId: string }>;
}

export default async function EditCoursePage(props: EditCoursePageInterface) {
  const { params } = props;
  const { courseId } = await params;

  const course = await getCourseServerCall(courseId);

  return <EditCourseClientPage course={course.data} />;
}
