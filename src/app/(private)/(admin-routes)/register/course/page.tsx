'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
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
import type { ReturnHandlerApiType } from '@/types';
import type { CourseInferType, PoslllSchemaInferType } from '@/yup';
import { courseSchema } from '@/yup';

export default function RegisterCoursePage() {
  const navigate = useRouter();
  const client = useQueryClient();
  const { registerCourse } = useCourses();
  const { listPoslll } = usePoslll();

  const { handleSubmit, control } = useForm<CourseInferType>({
    resolver: yupResolver(courseSchema),
  });

  const onSubmit = async (data: CourseInferType) => {
    await registerCourse.mutateAsync(data, {
      onSuccess: (data: ReturnHandlerApiType<CourseInferType>) => {
        toast.success(data.message);
        client.refetchQueries({ queryKey: ['cursos'] });
        navigate.push('/courses');
      },
      onError: (e) => toast.error(e.message),
    });
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

        <Button type="submit" className="w-full" isLoading={registerCourse.isPending}>
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}
