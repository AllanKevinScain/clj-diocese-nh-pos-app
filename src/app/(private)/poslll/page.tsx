'use client';

import { isEmpty } from 'lodash';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import type { InferType } from 'yup';

import { Button, Container, FieldDefault, Heading, Loading, NewTodo, Text } from '@/components';
import { useCreateQuery, usePoslll } from '@/hooks';
import type { poslllSchema } from '@/yup';

type PoslllSchemaInferType = InferType<typeof poslllSchema>;

export default function PosCLJlllPage() {
  const { listPoslll } = usePoslll();
  const { data: dataSession } = useSession();

  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const search = useWatch({ control, name: 'search' });

  const { data, isLoading, refetch } = useCreateQuery<PoslllSchemaInferType[]>({
    queryKey: ['listPoslll'],
    queryFn: listPoslll,
  });

  const filteredPoslll = useMemo(() => {
    if (data && !isEmpty(search)) {
      return data.filter(
        (user) =>
          user.candidateName?.toLowerCase().includes(search.toLowerCase()) ||
          user.parishChapel?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [data, search]);

  const isEmptyPoslll = filteredPoslll?.length === 0 && !isLoading;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <Heading>CLJ lll</Heading>
          <NewTodo content="Cadastrar novo CLJ lll" href="/register/poslll" />
        </div>
        <div className="flex w-full">
          <FieldDefault id="search" control={control} className="rounded-e-none" />
          <Button className="w-[40px] rounded-s-none" onClick={() => refetch()}>
            <FaSearch size={20} />
          </Button>
        </div>
      </div>

      {isEmptyPoslll && <Text className="text-center">Nenhum dado cadastrado</Text>}

      {!isEmptyPoslll &&
        filteredPoslll?.map((pos) => (
          <Button
            key={pos.id}
            disabled={dataSession?.user.loginType !== 'admin'}
            isLink
            variant="outline"
            href={`/edit/poslll/${pos.id}`}
            className="w-full flex-col items-start">
            <b>{pos.candidateName}</b>
            <div className="flex w-full justify-between">
              <span className="!font-bold">{pos.parishChapel}</span>
              {!pos.active && <b className="!font-bold text-red-500">Inativo</b>}
            </div>
          </Button>
        ))}
    </Container>
  );
}
