'use client';

import { isEmpty } from 'lodash';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import type * as yup from 'yup';

import { Button, Container, FieldDefault, Loading } from '@/components';
import { useCreateQuery, useDevice, useListRecords, useToggleModal } from '@/hooks';
import type { FilterRecordsType } from '@/types';
import type { filterRecordsSchema } from '@/yup';

import { FilterMobileList, FilterModal, FilterTable } from './components';

export type FilterRecordsSchemaInfertype = yup.InferType<typeof filterRecordsSchema>;
type FilterRecordsSchemaKeyType = keyof Omit<FilterRecordsSchemaInfertype, 'search'>;

const labelForFilterFields: Record<FilterRecordsSchemaKeyType, string> = {
  parishAcronym: 'Sigla paroq.',
  candidateName: 'Nome',
  nickname: 'Apelido',
  birthDate: 'Data de nasc.',
  candidatePhone: 'Telefone',
  instagram: 'Instagram',
  priest: 'Pároco',
  parishChapel: 'Paróquia/Capela',
  courseNumber: 'Curso',
  recordNumber: 'Ficha',
  typeOfRecord: 'Tipo de ficha',
};

export default function DownloadExcelArchives() {
  const { isOpen, handle } = useToggleModal();
  const { listAllRecords } = useListRecords();
  const isMobile = useDevice({ breakpoint: 768 });

  const methods = useForm<FilterRecordsSchemaInfertype>({
    defaultValues: {
      parishAcronym: null,
      candidateName: null,
      nickname: null,
      birthDate: null,
      candidatePhone: null,
      instagram: null,
      priest: null,
      parishChapel: null,
      courseNumber: null,
      recordNumber: null,
      search: null,
    },
  });

  const search = useWatch({ control: methods.control, name: 'search' });
  const values = useWatch({ control: methods.control });

  const { data, refetch, isLoading, isFetching } = useCreateQuery<FilterRecordsType>({
    queryKey: ['filterAllrecords', search],
    queryFn: () => listAllRecords(methods.getValues()),
  });

  const fullLoading = isLoading || isFetching;

  return (
    <FormProvider {...methods}>
      <FilterModal isOpen={isOpen} handleModal={handle} onSearch={() => refetch()} />

      <Container className="min-h-screen">
        <div className={twMerge('w-full', 'flex flex-col gap-[12px]')}>
          <div className="flex gap-[8px]">
            <div className="flex w-full">
              <FieldDefault id="search" control={methods.control} className="rounded-e-none" />
              <Button className="w-[40px] rounded-s-none" onClick={() => refetch()}>
                <FaSearch size={20} />
              </Button>
            </div>
            <Button onClick={handle}>
              <FaFilter />
            </Button>
          </div>
          <div className="flex items-center justify-end gap-[8px]">
            <div className="flex flex-wrap gap-[8px]">
              {Object.entries(values).map((filterOptions) => {
                const labelTyped = filterOptions[0] as FilterRecordsSchemaKeyType;
                if (isEmpty(filterOptions[1]) || filterOptions[0] === 'search') return;
                return (
                  <Button
                    variant="outline"
                    key={labelTyped}
                    onClick={() => {
                      methods.setValue(labelTyped, null);
                      refetch();
                    }}>
                    {labelForFilterFields[labelTyped]}
                    <IoCloseCircleOutline />
                  </Button>
                );
              })}
            </div>
            {Object.entries(values).filter((item) => !isEmpty(item[1]) && item[0] !== 'search')
              .length > 0 && (
              <Button
                onClick={() => {
                  methods.reset();
                  refetch();
                }}>
                <FaFilterCircleXmark />
              </Button>
            )}
          </div>
        </div>

        {fullLoading && <Loading message="Carregando..." overlay={false} />}
        {!fullLoading && !isMobile && (
          <FilterTable
            list={data}
            clearFilters={() => {
              methods.reset();
              refetch();
            }}
          />
        )}
        {!fullLoading && isMobile && (
          <FilterMobileList
            list={data}
            clearFilters={() => {
              methods.reset();
              refetch();
            }}
          />
        )}
      </Container>
    </FormProvider>
  );
}
