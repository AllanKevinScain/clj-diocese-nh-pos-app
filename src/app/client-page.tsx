'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button, Container, Divider, FieldDefault, Heading, Text } from '@/components';
import { useAuth } from '@/hooks';
import type { LoginSchemaInferType } from '@/yup';
import { loginSchema } from '@/yup';

export function ClientPage() {
  const navigate = useRouter();
  const { login } = useAuth();

  const { control, handleSubmit } = useForm<LoginSchemaInferType>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginSchemaInferType) {
    await login.mutateAsync(values, {
      onSuccess: () => {
        toast.success('Login efetuado com sucesso!');
        navigate.push('/courses');
      },
      onError: (e) => toast.error(e.message),
    });
  }

  return (
    <Container className="flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col gap-[6px]">
          <Heading as="h1">Gestão de cursos CLJ</Heading>
          <Divider className="max-w-[50%]" />
          <Text>Este site ajuda você a encontrar informações mais rápido</Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldDefault id="email" control={control} label="Digite seu e-mail" />

          <FieldDefault id="password" control={control} label="Digite sua senha" type="password" />

          <Button type="submit" className="w-full" isLoading={login.isPending}>
            Entrar
          </Button>
        </form>
      </div>
    </Container>
  );
}
