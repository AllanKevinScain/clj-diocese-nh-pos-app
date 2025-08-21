'use client';

import { useFormContext } from 'react-hook-form';

import { Button, DefaultDialog, FieldDefault, Heading } from '@/components';
import { formatMobilePhone } from '@/helpers';

import type { FilterRecordsSchemaInfertype } from '../page';

interface FilterModalInterface {
  isOpen: boolean;
  onSearch: () => void;
  handleModal: () => void;
}

export const FilterModal = (props: FilterModalInterface) => {
  const { isOpen, handleModal, onSearch } = props;
  const { control, reset } = useFormContext<FilterRecordsSchemaInfertype>();

  return (
    <DefaultDialog
      isOpen={isOpen}
      handleModal={handleModal}
      title="Filtro avançado"
      actionsButtons={
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="w-[80px]"
            onClick={() => {
              handleModal();
              reset();
            }}>
            Não
          </Button>
          <Button
            className="w-[80px]"
            onClick={() => {
              onSearch();
              handleModal();
            }}>
            Sim
          </Button>
        </div>
      }>
      <Heading>Pesquise por:</Heading>

      <div className="flex flex-col gap-2 p-[2px]">
        <FieldDefault
          id="candidateName"
          control={control}
          label="Nome"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={50}
        />
        <FieldDefault
          id="candidatePhone"
          control={control}
          onChange={(e) => formatMobilePhone(e)}
          label="Telefone"
        />
        <FieldDefault id="nickname" control={control} label="Apelido" maxLength={50} />
        <FieldDefault id="instagram" control={control} label="Instagram" maxLength={30} />
        <FieldDefault id="birthDate" control={control} type="date" label="Data de Nascimento" />
        <FieldDefault
          id="courseNumber"
          control={control}
          label="Número de curso"
          type="number"
          maxLength={4}
        />
        <FieldDefault
          id="recordNumber"
          control={control}
          label="Número de ficha"
          type="number"
          maxLength={2}
        />
        <FieldDefault
          id="parishAcronym"
          control={control}
          label="Sigla do grupo"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={10}
        />
        <FieldDefault
          id="parishChapel"
          control={control}
          label="Paróquia/Capela"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={50}
        />
        <FieldDefault
          id="priest"
          control={control}
          label="Pároco"
          onChange={(e) => e.replace(/[0-9]/g, '')}
          maxLength={50}
        />
      </div>
    </DefaultDialog>
  );
};
