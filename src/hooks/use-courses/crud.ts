import { identifyStatusError } from '@/helpers';
import type { CourseInferType } from '@/yup';

export async function registerCourse(props: CourseInferType) {
  const req = await fetch('/api/course', {
    method: 'POST',
    body: JSON.stringify(props),
  });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}

export async function updateCourse(props: CourseInferType) {
  const { id, ...rest } = props;
  const req = await fetch(`/api/course?courseId=${id}`, {
    method: 'PUT',
    body: JSON.stringify(rest),
  });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}

export async function deleteCourse(courseId: string) {
  const req = await fetch(`/api/course?courseId=${courseId}`, {
    method: 'DELETE',
  });
  const res = await req.json();
  identifyStatusError(res);
  return res;
}
