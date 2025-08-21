'use client';

import type { InferType } from 'yup';

import { Container, Heading, ListItem, Loading, NewTodo } from '@/components';
import { useCreateQuery, useUsers } from '@/hooks';
import type { userSchema } from '@/yup/user-schema';

type UserSchemaInferType = InferType<typeof userSchema>;

export default function UserClientPage() {
  const { listUsers } = useUsers();

  const { data, isLoading } = useCreateQuery<UserSchemaInferType[]>({
    queryKey: ['users'],
    queryFn: listUsers,
  });

  const isEmptyUsers = data?.length === 0 && !isLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (isEmptyUsers) {
    return (
      <Container className="flex flex-col justify-center gap-[16px]">
        <Heading className="text-center">Nenhum dado cadastrado</Heading>
        <NewTodo content="Cadastrar usuário" href="/register/user" />
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-[16px]">
      <Heading>Usuários</Heading>

      {data?.map((user) => (
        <ListItem.user key={user.id} href={`/edit/user/${user.id}`} {...user} />
      ))}

      <NewTodo content="Cadastrar usuário" href="/register/user" />
    </Container>
  );
}
