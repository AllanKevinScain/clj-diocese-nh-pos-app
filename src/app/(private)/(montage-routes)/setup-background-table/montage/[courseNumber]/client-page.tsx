'use client';

import { useForm } from 'react-hook-form';
import { BiEdit } from 'react-icons/bi';
import type { InferType } from 'yup';

import { Container, ControlButtons, Heading, Tab } from '@/components';
import type { backgroundTableSchema } from '@/yup';

import { Communities } from './communities';
import { Kitchen } from './kitchen';
import { RequiredFunctions } from './required-functions';

interface MontageClientPageInterface {
  courseNumber: string;
}

type BackgroundTableSchemaInferType = InferType<typeof backgroundTableSchema>;

export function MontageClientPage(props: MontageClientPageInterface) {
  const { courseNumber } = props;

  const { control, getValues } = useForm<BackgroundTableSchemaInferType>({
    defaultValues: {
      auxiliar: null,
      base: null,
      coordinator: null,
      courseNumber,
      auxiliarLiturgy: '',
      auxiliarSecretary: '',
      bar: '',
      coupleKitchenCoordinator: '',
      coupleSafeToBe: '',
      folkloreCoordinator: '',
      kitchenSpiritual: '',
      liturgy: '',
      secretary: '',
      cleanWorkRecords: [],
      copeWorkRecords: [],
      kitchenWorkRecords: [],
      communities: [],
    },
  });

  return (
    <>
      <Container className="flex flex-col gap-[16px]">
        <Heading>Montagem do curso {courseNumber}</Heading>

        <Tab.container>
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
        </Tab.container>
      </Container>
      <ControlButtons
        buttons={[
          { label: 'Salvar', icon: <BiEdit size={40} />, click: () => console.log(getValues()) },
        ]}
      />
    </>
  );
}
