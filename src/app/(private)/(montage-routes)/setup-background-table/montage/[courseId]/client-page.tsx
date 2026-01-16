'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import type { InferType } from 'yup';

import { Container, ControlButtons, Heading, Tab } from '@/components';
import { useWorkTable } from '@/hooks';
import { TabProvider } from '@/providers/tab';
import type { ReturnHandlerApiType, WorkTableResponseInterface } from '@/types';
import type { CourseInferType } from '@/yup';
import { backgroundTableSchema } from '@/yup';

import { Communities } from './communities';
import { Kitchen } from './kitchen';
import { RequiredFunctions } from './required-functions';

interface MontageClientPageInterface {
  course: CourseInferType;
  workTable: WorkTableResponseInterface | null;
}

type BackgroundTableSchemaInferType = InferType<typeof backgroundTableSchema>;

const workTableInitiate: BackgroundTableSchemaInferType = {
  auxiliar: null,
  base: null,
  coordinator: null,
  courseNumber: null,
  auxiliarLiturgy: null,
  auxiliarSecretary: null,
  bar: null,
  coupleKitchenCoordinator: null,
  coupleSafeToBe: null,
  folkloreCoordinator: null,
  kitchenSpiritual: null,
  liturgy: null,
  secretary: null,
  cleanWorkRecords: [],
  copeWorkRecords: [],
  kitchenWorkRecords: [],
  communities: [],
};

export function MontageClientPage(props: MontageClientPageInterface) {
  const { course, workTable } = props;

  const router = useRouter();

  const {
    endDate: _endDate,
    startDate: _startDate,
    typeOfCourse: _typeOfCourse,
    id,
    ...restCourse
  } = course;
  const { updateWorkTable, registerWorkTable } = useWorkTable();

  const { control, getValues } = useForm<BackgroundTableSchemaInferType>({
    resolver: yupResolver(backgroundTableSchema),
    defaultValues: {
      courseId: id,
      ...workTableInitiate,
      ...workTable,
      ...restCourse,
    },
  });

  const handleWorkTable = useCallback(async () => {
    const isCreated = !isEmpty(workTable);
    if (isCreated) {
      await updateWorkTable.mutateAsync(getValues(), {
        onSuccess: (data: ReturnHandlerApiType<BackgroundTableSchemaInferType>) => {
          toast.success(data.message);
          router.push('/setup-background-table/courses');
        },
        onError: (e) => toast.error(e.message),
      });
    } else {
      await registerWorkTable.mutateAsync(getValues(), {
        onSuccess: (data: ReturnHandlerApiType<BackgroundTableSchemaInferType>) => {
          toast.success(data.message);
          router.push('/setup-background-table/courses');
        },
        onError: (e) => toast.error(e.message),
      });
    }
  }, [workTable, updateWorkTable, getValues, router, registerWorkTable]);

  return (
    <>
      <Container className="flex flex-col gap-[16px]">
        <Heading>
          Montagem do curso {course.courseNumber} - {course.typeOfCourse}
        </Heading>

        <TabProvider>
          <Tab.header>
            <Tab.hi value={0} label="Coordenação" />
            <Tab.hi value={1} label="Cozinha" />
            <Tab.hi value={2} label="Comunidades" />
          </Tab.header>

          <Tab.body>
            <Tab.bi value={0}>
              <RequiredFunctions control={control} />
            </Tab.bi>
            <Tab.bi value={1}>
              <Kitchen control={control} />
            </Tab.bi>
            <Tab.bi value={2}>
              <Communities control={control} />
            </Tab.bi>
          </Tab.body>
        </TabProvider>
      </Container>
      <ControlButtons
        buttons={[
          {
            label: 'Salvar',
            icon: <BiEdit size={40} />,
            click: async () => await handleWorkTable(),
            isLoading: updateWorkTable.isPending || registerWorkTable.isPending,
          },
        ]}
      />
    </>
  );
}
