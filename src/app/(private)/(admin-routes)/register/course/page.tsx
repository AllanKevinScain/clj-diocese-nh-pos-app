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

export default function RegisterCoursePage() {
  const navigate = useRouter();
  const { registerCourse } = useCourses();

  const { handleSubmit, control } = useForm<CourseInferType>({
    resolver: yupResolver(courseSchema),
  });

  const onSubmit = async (data: CourseInferType) => {
    const res = await registerCourse(data);

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate.push('/courses');
    }
  };

  return (
    <Container>
      <Heading>Cadastrar Curso</Heading>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FieldDefault id="startDate" control={control} type="date" label="Data de início" />

        <FieldDefault id="endDate" control={control} type="date" label="Data de término" />

        <SelectDefault
          id="typeOfCourse"
          control={control}
          label="Tipo do curso"
          options={[
            { value: 'POSl', label: 'Curso de Liderança - Pós 1' },
            { value: 'POSll', label: 'Curso de Liderança - Pós 2' },
          ]}
        />

        <FieldDefault
          id="courseNumber"
          control={control}
          label="Número do curso"
          type="number"
          maxLength={4}
        />

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}
