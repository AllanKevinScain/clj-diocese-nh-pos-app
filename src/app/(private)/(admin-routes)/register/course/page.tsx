'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { Button, FieldDefault, SelectDefault } from '@/components';
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
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Cadastrar Curso</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <FieldDefault
          id="startDate"
          control={control}
          type="date"
          customLabel={<span className="font-medium text-gray-700">Data de início</span>}
        />

        <FieldDefault
          id="endDate"
          control={control}
          type="date"
          customLabel={<span className="font-medium text-gray-700">Data de término</span>}
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

        <FieldDefault
          id="courseNumber"
          control={control}
          label="Número do curso"
          type="number"
          maxLength={4}
        />

        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}
