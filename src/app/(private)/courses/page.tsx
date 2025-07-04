'use client';

import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TbLoaderQuarter } from 'react-icons/tb';
import type { InferType } from 'yup';

import { useCourses, useCreateQuery } from '@/hooks';
import type { courseSchema } from '@/yup';

import { NewCourse } from './components';

type CourseSchemaInferType = InferType<typeof courseSchema>;

export default function CoursesPage() {
  const navigate = useRouter();

  const { listCourses } = useCourses();

  const { data, isLoading } = useCreateQuery<CourseSchemaInferType[]>({
    queryKey: ['cursos'],
    queryFn: listCourses,
    onError: (error) => {
      toast.error(String(error.data?.message));
    },
  });

  const isEmptyCourse = data && data.length === 0 && !isLoading;

  const poslCourses = data?.filter((curso) => curso.typeOfCourse === 'POSl');
  const posllCourses = data?.filter((curso) => curso.typeOfCourse === 'POSll');

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <TbLoaderQuarter size={30} className="animate-spin" />
      </div>
    );
  }

  if (isEmptyCourse) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-2">
        <h2 className="text-center text-2xl font-semibold">Nenhum curso foi cadastrado!</h2>
        <NewCourse />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 pb-[10%]">
      <h1 className="mt-6 mb-4 text-3xl font-bold">Cursos</h1>

      <div className="space-y-6">
        {!isEmpty(poslCourses) && (
          <div>
            <h2 className="mb-2 text-xl font-semibold">CLJ Pós 1</h2>
            <div className="space-y-4">
              {poslCourses?.map((course) => (
                <div
                  key={course.id}
                  className="cursor-pointer rounded-lg border p-4 shadow-sm transition hover:shadow-md"
                  onClick={() =>
                    navigate.push(`/courses/${course.courseNumber}/posl?courseId=${course.id}`)
                  }>
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">Curso Nº {course.courseNumber}</span>
                    <span className="mt-1 text-sm text-gray-600 sm:mt-0">
                      {dayjs(new Date(course.startDate)).format('DD/MM/YYYY')} -{' '}
                      {dayjs(new Date(course.endDate)).format('DD/MM/YYYY')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isEmpty(posllCourses) && (
          <div>
            <h2 className="mb-2 text-xl font-semibold">CLJ Pós 2</h2>
            <div className="space-y-4">
              {posllCourses?.map((course) => (
                <div
                  key={course.id}
                  className="cursor-pointer rounded-lg border p-4 shadow-sm transition hover:shadow-md"
                  onClick={() =>
                    navigate.push(`/courses/${course.courseNumber}/posll?courseId=${course.id}`)
                  }>
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">Curso Nº {course.courseNumber}</span>
                    <span className="mt-1 text-sm text-gray-600 sm:mt-0">
                      {dayjs(new Date(course.startDate)).format('DD/MM/YYYY')} -{' '}
                      {dayjs(new Date(course.endDate)).format('DD/MM/YYYY')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 text-center">
          <NewCourse />
        </div>
      </div>
    </div>
  );
}
