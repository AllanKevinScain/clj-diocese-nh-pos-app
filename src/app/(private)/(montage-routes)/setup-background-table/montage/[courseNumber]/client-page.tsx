'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import type { InferType } from 'yup';

import { Container, ControlButtons, Heading, Tab } from '@/components';
import { useWorkTable } from '@/hooks';
import { TabProvider } from '@/providers/tab';
import type { WorkTableResponseInterface } from '@/types';
import { backgroundTableSchema } from '@/yup';

import { Communities } from './communities';
import { Kitchen } from './kitchen';
import { RequiredFunctions } from './required-functions';

interface MontageClientPageInterface {
  courseNumber: string;
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
  const { courseNumber, workTable } = props;
  const { updateWorkTable, registerWorkTable } = useWorkTable();

  const { control, getValues } = useForm<BackgroundTableSchemaInferType>({
    resolver: yupResolver(backgroundTableSchema),
    defaultValues: {
      ...workTableInitiate,
      ...workTable,
      courseNumber,
    },
  });

  const handleWorkTable = useCallback(async () => {
    const isCreated = !isEmpty(workTable);

    let callResponse = {} as { ok: boolean; data: { message: string; data: unknown } };

    if (isCreated) {
      callResponse = await updateWorkTable(getValues());
    } else {
      callResponse = await registerWorkTable(getValues());
    }

    if (callResponse.ok) {
      return toast.success(callResponse.data.message);
    }

    return toast.error(JSON.stringify(callResponse.data));
  }, [registerWorkTable, updateWorkTable, getValues, workTable]);

  return (
    <>
      <Container className="flex flex-col gap-[16px]">
        <Heading>Montagem do curso {courseNumber}</Heading>

        <TabProvider>
          <Tab.header>
            <Tab.hi value={0} label="Coordenação" />
            <Tab.hi value={1} label="Cozinha" />
            <Tab.hi value={2} label="Comunidades" />
          </Tab.header>

          <Tab.body>
            <Tab.bi value={0}>
              <RequiredFunctions control={control} courseNumber={courseNumber} />
            </Tab.bi>
            <Tab.bi value={1}>
              <Kitchen control={control} courseNumber={courseNumber} />
            </Tab.bi>
            <Tab.bi value={2}>
              <Communities control={control} courseNumber={courseNumber} />
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
          },
        ]}
      />
    </>
  );
}
