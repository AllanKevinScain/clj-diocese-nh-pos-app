'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { Button, Container, FieldDefault, Heading, SelectDefault } from '@/components';
import { useUsers } from '@/hooks';
import { registerUserSchema } from '@/yup/user-schema';

type RegisterUserSchemaInferType = InferType<typeof registerUserSchema>;

export default function RegisterUserClientPage() {
  const { registerUser } = useUsers();

  const { handleSubmit, control } = useForm<RegisterUserSchemaInferType>({
    resolver: yupResolver(registerUserSchema),
  });

  const onSubmit = async (data: RegisterUserSchemaInferType) => {
    await registerUser(data);
  };

  return (
    <Container>
      <Heading>Cadastrar usuário</Heading>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FieldDefault id="name" control={control} label="Paróquia/Capela" />

        <FieldDefault id="email" control={control} label="Email" />

        <FieldDefault id="password" control={control} label="Senha" type="password" />

        <SelectDefault
          id="loginType"
          control={control}
          label="Tipo de usuário"
          options={[
            {
              value: 'admin',
              label: 'Administrador - Possui liberdade para qualquer ação',
            },
            { value: 'manager', label: 'Gerente - Pode cadastrar fixas' },
            { value: 'builder-manager', label: 'Montagem - Pode mexer na mesa de fundo' },
          ]}
        />

        <FieldDefault id="city" control={control} label="Cidade" />

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}
