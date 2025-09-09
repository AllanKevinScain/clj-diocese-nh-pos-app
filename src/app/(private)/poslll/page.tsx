'use client';

import { useSession } from 'next-auth/react';
import type { InferType } from 'yup';

import { Button, Container, Heading, Loading, NewTodo } from '@/components';
import { useCreateQuery, usePoslll } from '@/hooks';
import type { poslllSchema } from '@/yup';

type PoslllSchemaInferType = InferType<typeof poslllSchema>;

export default function PosCLJlllPage() {
  const { listPoslll } = usePoslll();
  const { data: dataSession } = useSession();

  const { data, isLoading } = useCreateQuery<PoslllSchemaInferType[]>({
    queryKey: ['listPoslll'],
    queryFn: listPoslll,
  });

  const isEmptyPoslll = data && data.length === 0 && !isLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (isEmptyPoslll) {
    return (
      <Container className="flex flex-col gap-[16px]">
        <Heading>Nenhum dado cadastrado</Heading>
        <NewTodo content="Cadastrar novo CLJ lll" href="/register/poslll" />
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-[16px]">
      <Heading>Cursos</Heading>

      {data?.map((pos) => (
        <Button
          key={pos.id}
          disabled={dataSession?.user.loginType !== 'admin'}
          isLink
          variant="outline"
          href={`/edit/poslll/${pos.id}`}
          className="w-full">
          {pos.candidateName} - {pos.parishChapel}
        </Button>
      ))}
      <NewTodo content="Cadastrar novo CLJ lll" href="/register/poslll" />
    </Container>
  );
}
