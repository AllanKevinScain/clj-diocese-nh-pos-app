'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Container } from '@/components';
import { useUsers } from '@/hooks';
import type { UserPasswordSchemaInferType } from '@/yup/user-schema';
import { userPasswordSchema } from '@/yup/user-schema';

import { Password } from './components/password';

export default function EditPasswordUserPage() {
  const params = useParams<{ userId: string }>();
  const router = useRouter();

  const { updateUserPassword } = useUsers();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserPasswordSchemaInferType>({
    resolver: yupResolver(userPasswordSchema),
  });

  const onSubmit = async (data: UserPasswordSchemaInferType) => {
    await updateUserPassword({ ...data, id: params.userId });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Password
          label="Senha antiga"
          control={control}
          errors={errors}
          id="password"
          helpText="Este campo serve para verificar se a senha antiga não se repetirá"
        />

        <Password label="Senha nova" control={control} errors={errors} id="newPassword" />

        <Password
          label="Confirmar senha"
          control={control}
          errors={errors}
          id="confirmNewPassword"
        />

        <div className="flex gap-[16px]">
          <Button type="button" variant="outline" className="w-full" onClick={router.back}>
            Cancelar
          </Button>
          <Button type="submit" className="w-full">
            Atualizar
          </Button>
        </div>
      </form>
    </Container>
  );
}
