'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { Button, Container, FieldDefault, Heading, SelectDefault } from '@/components';
import { useCourses } from '@/hooks';
import { courseSchema } from '@/yup';

export type CourseInferType = InferType<typeof courseSchema>;

interface EditCourseClientPageInterface {
  course: CourseInferType;
}

export const EditCourseClientPage = (props: EditCourseClientPageInterface) => {
  const { course } = props;
  const navigate = useRouter();
  const { updateCourse } = useCourses();

  const { handleSubmit, control } = useForm<CourseInferType>({
    resolver: yupResolver(courseSchema),
    defaultValues: course,
  });

  const onSubmit = async (data: CourseInferType) => {
    const res = await updateCourse(data);

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate.push('/courses');
    }
  };

  return (
    <Container>
      <Heading>Edição do curso {course.courseNumber}</Heading>
      <Heading>{course.typeOfCourse}</Heading>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FieldDefault
          id="startDate"
          control={control}
          type="date"
          customLabel={
            <label className="mb-1 block font-medium text-gray-700">Data de início</label>
          }
        />

        <FieldDefault
          control={control}
          id="endDate"
          type="date"
          customLabel={
            <label className="mb-1 block font-medium text-gray-700">Data de término</label>
          }
        />

        <SelectDefault
          id="typeOfCourse"
          control={control}
          label="Tipo do curso"
          options={[
            { value: 'POSl', label: 'Curso de Liderança - Pós 1' },
            { value: 'POSll', label: 'Curso de Liderança - Pós 2' },
          ]}
        />

        <FieldDefault id="courseNumber" control={control} label="Número do curso" type="number" />

        <Button type="submit" className="w-full">
          Atualizar
        </Button>
      </form>
    </Container>
  );
};
