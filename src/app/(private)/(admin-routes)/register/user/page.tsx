'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { Button, FieldDefault, SelectDefault } from '@/components';
import { useUsers } from '@/hooks';
import { registerUserSchema } from '@/yup/user-schema';

type RegisterUserSchemaInferType = InferType<typeof registerUserSchema>;

export default function RegisterUserClientPage() {
  const navigate = useRouter();
  const { registerUser } = useUsers();

  const { handleSubmit, control } = useForm<RegisterUserSchemaInferType>({
    resolver: yupResolver(registerUserSchema),
  });

  const onSubmit = async (data: RegisterUserSchemaInferType) => {
    const res = await registerUser(data);

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate.push('/view/users');
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Cadastrar usuário</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FieldDefault id="name" defaultValue="" control={control} label="Paróquia/Capela" />

        <FieldDefault id="email" defaultValue="" control={control} label="Email" />

        <FieldDefault
          id="password"
          defaultValue=""
          control={control}
          label="Senha"
          type="password"
        />

        <SelectDefault
          id="loginType"
          defaultValue=""
          control={control}
          label="Tipo de usuário"
          options={[
            {
              value: 'admin',
              label: 'Administrador - Possui liberdade para qualquer ação',
            },
            { value: 'manager', label: 'Gerente - Pode cadastrar fixas' },
          ]}
        />

        <FieldDefault id="city" defaultValue="" control={control} label="Cidade" />

        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}
