'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  Button,
  Container,
  FieldDefault,
  Heading,
  SelectDefault,
  SelectWithQuery,
} from '@/components';
import { filterPoslll } from '@/helpers';
import { useCourses, usePoslll } from '@/hooks';
import type { CourseInferType, PoslllSchemaInferType } from '@/yup';
import { courseSchema } from '@/yup';

interface EditCourseClientPageInterface {
  course: CourseInferType;
}

export const EditCourseClientPage = (props: EditCourseClientPageInterface) => {
  const { course } = props;
  const navigate = useRouter();
  const { updateCourse } = useCourses();
  const { listPoslll } = usePoslll();

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

        <SelectWithQuery
          control={control}
          label="Coordenador(a)"
          id="coordinator"
          call={listPoslll}
          route="poslll"
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return filterPoslll(typedData, 'younger');
          }}
        />

        <SelectWithQuery
          control={control}
          label="Base"
          id="base"
          call={listPoslll}
          route="poslll"
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return filterPoslll(typedData, 'younger');
          }}
        />

        <SelectWithQuery
          control={control}
          label="Auxiliar de mesa de fundo"
          id="auxiliar"
          call={listPoslll}
          route="poslll"
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return filterPoslll(typedData, 'younger');
          }}
        />

        <SelectWithQuery
          control={control}
          label="Casal coordenador de cozinha"
          id="coupleKitchenCoordinator"
          call={listPoslll}
          route="poslll"
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return filterPoslll(typedData, 'older');
          }}
        />

        <SelectWithQuery
          control={control}
          label="Espiritual de cozinha"
          id="kitchenSpiritual"
          call={listPoslll}
          route="poslll"
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return filterPoslll(typedData, 'younger');
          }}
        />

        <SelectWithQuery
          control={control}
          label="Liturgia"
          id="liturgy"
          call={listPoslll}
          route="poslll"
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return filterPoslll(typedData, 'younger');
          }}
        />

        <SelectWithQuery
          control={control}
          label="Secretaria(o)"
          id="secretary"
          call={listPoslll}
          route="poslll"
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return filterPoslll(typedData, 'younger');
          }}
        />

        <Button type="submit" className="w-full">
          Atualizar
        </Button>
      </form>
    </Container>
  );
};
