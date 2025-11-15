'use client';

import { useForm, useWatch } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

import { Button, Container, FieldDefault, Loading } from '@/components';
import { useCreateQuery, useDevice, useListRecords } from '@/hooks';
import type { FilterRecordsType } from '@/types';
import type { SearchFilterInfertype } from '@/yup';

import { FilterMobileList, FilterTable } from './components';

export default function DownloadExcelArchives() {
  const { listAllRecords } = useListRecords();
  const isMobile = useDevice({ breakpoint: 768 });

  const methods = useForm<SearchFilterInfertype>({
    defaultValues: {
      search: null,
    },
  });

  const search = useWatch({ control: methods.control, name: 'search' });

  const { data, refetch, isLoading, isFetching } = useCreateQuery<FilterRecordsType>({
    queryKey: ['filterAllrecords', search],
    queryFn: () => listAllRecords(methods.getValues()),
  });

  const fullLoading = isLoading || isFetching;

  return (
    <Container className="flex flex-col gap-[12px]">
      <div className="flex w-full">
        <FieldDefault id="search" control={methods.control} className="rounded-e-none" />
        <Button className="w-[40px] rounded-s-none" onClick={() => refetch()}>
          <FaSearch size={20} />
        </Button>
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
  );
}
