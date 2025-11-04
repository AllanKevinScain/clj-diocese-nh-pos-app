'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { Button, Container, Divider, FieldDefault, Heading, Text } from '@/components';
import { loginSchema } from '@/yup';

type LoginSchemaInferType = InferType<typeof loginSchema>;

const defaultValues = {
  email: 'padrejose@gmail.com',
  //   email: 'teste@gmail.com',
  password: 'teste123!',
};

export function ClientPage() {
  const navigate = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<LoginSchemaInferType>({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  async function onSubmit(values: LoginSchemaInferType) {
    const { email, password } = values;
    const res = await signIn('credentials', {
      email: email.toLowerCase().trim(),
      password: password.trim(),
      redirect: false,
    });

    if (!res?.ok) {
      toast.error('Usuário não cadastrado!');
    } else {
      toast.success('Login efetuado com sucesso!');
      navigate.push('/courses');
    }
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

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Entrar
          </Button>
        </form>
      </div>
    </Container>
  );
}
