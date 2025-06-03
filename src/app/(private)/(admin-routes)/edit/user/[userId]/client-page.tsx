'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { AcceptModal, Button, FieldDefault, SelectDefault } from '@/components';
import { useToggleModal, useUsers } from '@/hooks';
import { userSchema } from '@/yup/user-schema';

type UserSchemaInferType = InferType<typeof userSchema>;

interface EditUserClientPageInterface {
  user: UserSchemaInferType;
}

export const EditUserClientPage = (props: EditUserClientPageInterface) => {
  const { user } = props;
  const navigate = useRouter();

  const { updateUser, deleteUser } = useUsers();
  const { isOpen, handle } = useToggleModal();

  const { handleSubmit, control } = useForm<UserSchemaInferType>({
    resolver: yupResolver(userSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: UserSchemaInferType) => {
    const res = await updateUser(data);

    if (!res?.ok) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      navigate.push('/view/users');
    }
  };

  async function deleteUserById() {
    const response = await deleteUser(user.id!);

    if (!response?.ok) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      navigate.push('/view/users');
    }
  }

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deleteUserById} />

      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="mb-8 text-center text-2xl font-semibold">
          Edição do usuário {user.name} | {user.loginType}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FieldDefault id="name" defaultValue="" control={control} label="Nome" />

          <FieldDefault id="email" defaultValue="" control={control} label="Email" />

          <SelectDefault
            id="loginType"
            defaultValue=""
            control={control}
            label="Tipo de usuário"
            options={[
              { value: 'admin', label: 'Possui liberdade para qualquer ação' },
              { value: 'manager', label: 'Pode cadastrar fixas' },
            ]}
          />

          <FieldDefault id="city" defaultValue="" control={control} label="Cidade" />

          <Button type="submit">Atualizar</Button>

          <Button type="button" onClick={handle}>
            Apagar usuário
          </Button>
        </form>
      </div>
    </>
  );
};
