'use client';

import type { Control } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { InferType } from 'yup';

import { SelectWithQuery, SessionForm } from '@/components';
import { useEspecificRecords } from '@/hooks';
import type { FilterRecordsType } from '@/types';
import type { backgroundTableSchema } from '@/yup';

type BackgroundTableSchemaInferType = InferType<typeof backgroundTableSchema>;

interface RequiredFunctionsInterface {
  courseNumber: string;
  control: Control<BackgroundTableSchemaInferType>;
}

export const RequiredFunctions = (props: RequiredFunctionsInterface) => {
  const { courseNumber, control } = props;

  const { listCoupleRecordsByNumberCourse, listWorkRecordsByNumberCourse } = useEspecificRecords();

  return (
    <div className={twMerge('flex flex-col gap-[16px]', 'w-full pb-[10%]')}>
      {/* <SessionForm title="Principais funções:">
        <SelectWithQuery
          control={control}
          label="Coordenador(a)"
          id="coordinator"
          call={listPoslll}
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return typedData.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
        <SelectWithQuery
          control={control}
          label="Base"
          id="base"
          call={listPoslll}
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return typedData.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
        <SelectWithQuery
          control={control}
          label="Auxiliar de mesa de fundo"
          id="auxiliar"
          call={listPoslll}
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return typedData.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
      </SessionForm> */}

      <SessionForm title="Mesa de fundo:">
        <SelectWithQuery
          control={control}
          label="Casal bem estar"
          id="coupleSafeToBe"
          call={() => listCoupleRecordsByNumberCourse(courseNumber)}
          modelData={(data) => {
            const typedData = data as FilterRecordsType;
            return typedData.data.map((item) => ({
              label: `Tios ${item.candidateName} e ${item.recordCouple?.womanName}`,
              value: item.id ?? '',
            }));
          }}
        />
        {/* <SelectWithQuery
          control={control}
          label="Casal coordenador de cozinha"
          id="coupleKitchenCoordinator"
          call={() => listCoupleRecordsByNumberCourse(courseNumber)}
          modelData={(data) => {
            const typedData = data as FilterRecordsType;
            return typedData.data.map((item) => ({
              label: `Tios ${item.candidateName} e ${item.recordCouple?.womanName}`,
              value: item.id ?? '',
            }));
          }}
        />
        <SelectWithQuery
          control={control}
          label="Espiritual de cozinha"
          id="kitchenSpiritual"
          call={listPoslll}
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return typedData.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
        <SelectWithQuery
          control={control}
          label="Liturgia"
          id="liturgy"
          call={listPoslll}
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return typedData.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
        <SelectWithQuery
          control={control}
          label="Secretaria(o)"
          id="secretary"
          call={listPoslll}
          modelData={(data) => {
            const typedData = data as PoslllSchemaInferType[];
            return typedData.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        /> */}
        <SelectWithQuery
          control={control}
          label="Auxiliar de liturgia"
          id="auxiliarLiturgy"
          call={() => listWorkRecordsByNumberCourse(courseNumber)}
          modelData={(data) => {
            const typedData = data as FilterRecordsType;
            return typedData.data.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
        <SelectWithQuery
          control={control}
          label="Auxiliar de secretaria"
          id="auxiliarSecretary"
          call={() => listWorkRecordsByNumberCourse(courseNumber)}
          modelData={(data) => {
            const typedData = data as FilterRecordsType;
            return typedData.data.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
        <SelectWithQuery
          control={control}
          label="Coordenador de folclore"
          id="folkloreCoordinator"
          call={() => listWorkRecordsByNumberCourse(courseNumber)}
          modelData={(data) => {
            const typedData = data as FilterRecordsType;
            return typedData.data.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
        <SelectWithQuery
          control={control}
          label="Bar"
          id="bar"
          call={() => listWorkRecordsByNumberCourse(courseNumber)}
          modelData={(data) => {
            const typedData = data as FilterRecordsType;
            return typedData.data.map((item) => ({
              label: item.candidateName,
              value: item.id ?? '',
            }));
          }}
        />
      </SessionForm>
    </div>
  );
};
