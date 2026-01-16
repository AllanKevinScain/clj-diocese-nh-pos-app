'use client';

import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

import {
  Button,
  Container,
  FieldDefault,
  Heading,
  ListItem,
  Loading,
  NewTodo,
  Text,
} from '@/components';
import { useUsers } from '@/hooks';
import type { ListUsersReturnInterface } from '@/hooks/use-users/use-users.type';

export default function UserClientPage() {
  const { listUsers } = useUsers();

  const { control } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const search = useWatch({ control, name: 'search' });

  const { data, isLoading, refetch } = useQuery<ListUsersReturnInterface>({
    queryKey: ['users'],
    queryFn: listUsers,
  });

  const filteredUsers = useMemo(() => {
    if (data?.data && !isEmpty(search)) {
      return data?.data.filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.coName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data?.data;
  }, [data, search]);

  const isEmptyUsers = filteredUsers?.length === 0 && !isLoading;

  if (isLoading) return <Loading />;

  return (
    <Container className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <Heading>Usuários</Heading>
          <NewTodo content="Cadastrar usuário" href="/register/user" className="w-[170px]" />
        </div>
        <div className="flex w-full">
          <FieldDefault id="search" control={control} className="rounded-e-none" />
          <Button className="w-[40px] rounded-s-none" onClick={() => refetch()}>
            <FaSearch size={20} />
          </Button>
        </div>
      </div>

      {isEmptyUsers && <Text className="text-center">Nenhum dado cadastrado</Text>}

      {!isEmptyUsers &&
        filteredUsers?.map((user) => {
          return <ListItem.user key={user.id} href={`/edit/user/${user.id}`} {...user} />;
        })}
    </Container>
  );
}
