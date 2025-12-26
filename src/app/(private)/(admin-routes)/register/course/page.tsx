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

export default function RegisterCoursePage() {
  const navigate = useRouter();
  const { registerCourse } = useCourses();
  const { listPoslll } = usePoslll();

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
            { value: 'POSlll', label: 'Curso de Liderança - Pós 3' },
          ]}
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
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}
