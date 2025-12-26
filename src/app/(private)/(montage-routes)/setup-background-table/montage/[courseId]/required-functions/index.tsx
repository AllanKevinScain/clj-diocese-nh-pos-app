'use client';

import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';

import { Loading, SelectDefault, SessionForm } from '@/components';
import { MontageContext } from '@/providers';
import type { TabComponentWorkTableInterface } from '@/types';

import { SelectRequiredFunctions } from '../components';

export const RequiredFunctions = (props: Pick<TabComponentWorkTableInterface, 'control'>) => {
  const { control } = props;

  const { isLoadingRecords, records } = useContext(MontageContext);

  if (isLoadingRecords) return <Loading />;

  return (
    <div className={twMerge('flex flex-col gap-[16px]', 'w-full pb-[10%]')}>
      <SessionForm title="Principais funções:">
        <SelectRequiredFunctions
          control={control}
          label="Coordenador(a)"
          id="coordinator"
          disabled
        />
        <SelectRequiredFunctions control={control} label="Base" id="base" disabled />
        <SelectRequiredFunctions
          control={control}
          label="Auxiliar de mesa de fundo"
          id="auxiliar"
          disabled
        />
      </SessionForm>

      <SessionForm title="Mesa de fundo:">
        <SelectRequiredFunctions
          control={control}
          label="Casal coordenador de cozinha"
          id="coupleKitchenCoordinator"
          typeRecord="COUPLE"
          disabled
        />
        <SelectRequiredFunctions
          control={control}
          label="Espiritual de cozinha"
          id="kitchenSpiritual"
          disabled
        />
        <SelectRequiredFunctions control={control} label="Liturgia" id="liturgy" disabled />
        <SelectRequiredFunctions control={control} label="Secretaria(o)" id="secretary" disabled />

        <SelectDefault
          control={control}
          label="Auxiliar de liturgia"
          id="auxiliarLiturgy"
          options={records?.filter((item) => item.isWork) || []}
        />
        <SelectDefault
          control={control}
          label="Auxiliar de secretaria"
          id="auxiliarSecretary"
          options={records?.filter((item) => item.isWork) || []}
        />
        <SelectDefault
          control={control}
          label="Coordenador de folclore"
          id="folkloreCoordinator"
          options={records?.filter((item) => item.isWork) || []}
        />
        <SelectDefault
          control={control}
          label="Bar"
          id="bar"
          options={records?.filter((item) => item.isWork) || []}
        />
        <SelectDefault
          control={control}
          label="Casal bem estar"
          id="coupleSafeToBe"
          options={records?.filter((item) => item.isCoupleWork) || []}
        />
      </SessionForm>
    </div>
  );
};
