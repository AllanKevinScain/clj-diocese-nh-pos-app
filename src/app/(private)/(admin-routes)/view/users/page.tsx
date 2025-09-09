'use client';

import { Container, Heading, ListItem, Loading, NewTodo } from '@/components';
import { useCreateQuery, useUsers } from '@/hooks';
import type { ListUsersReturnInterface } from '@/hooks/use-users/use-users.type';

export default function UserClientPage() {
  const { listUsers } = useUsers();

  const { data, isLoading } = useCreateQuery<ListUsersReturnInterface>({
    queryKey: ['users'],
    queryFn: listUsers,
  });

  const filteredUsers = data?.data.filter((user) => user?.loginType !== 'admin') || [];
  const isEmptyUsers = filteredUsers.length === 0 && !isLoading;

  if (isLoading) return <Loading />;

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

      {filteredUsers.map((user) => {
        return <ListItem.user key={user.id} href={`/edit/user/${user.id}`} {...user} />;
      })}

      <NewTodo content="Cadastrar usuário" href="/register/user" />
    </Container>
  );
}
