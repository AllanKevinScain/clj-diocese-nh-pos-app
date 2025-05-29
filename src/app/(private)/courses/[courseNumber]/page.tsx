import { CourseClientPage } from './client-page';

interface CoursePageInterface {
  params: Promise<{ courseNumber: string }>;
  searchParams: Promise<unknown>;
}

export default async function CoursePage(props: CoursePageInterface) {
  const { params } = props;
  const { courseNumber } = await params;

  return <CourseClientPage courseNumber={courseNumber} />;
}
