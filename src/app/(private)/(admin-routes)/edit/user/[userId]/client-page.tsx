'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { InferType } from 'yup';

import { AcceptModal, Button, Container, FieldDefault, Heading, SelectDefault } from '@/components';
import { useToggleModal, useUsers } from '@/hooks';
import { userSchema } from '@/yup/user-schema';

type UserSchemaInferType = InferType<typeof userSchema>;

interface EditUserClientPageInterface {
  user: UserSchemaInferType;
}

export const EditUserClientPage = (props: EditUserClientPageInterface) => {
  const { user } = props;

  const { updateUser, deleteUser } = useUsers();
  const { isOpen, handle } = useToggleModal();

  const { handleSubmit, control } = useForm<UserSchemaInferType>({
    resolver: yupResolver(userSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: UserSchemaInferType) => {
    await updateUser(data);
  };

  async function deleteUserById() {
    await deleteUser(user.id!);
  }

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deleteUserById} />

      <Container>
        <Heading>Edição do usuário {user.name}</Heading>
        <Heading as="h2">{user.loginType}</Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FieldDefault id="name" control={control} label="Nome" />

          <FieldDefault id="email" control={control} label="Email" />

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

          <div className="flex gap-[16px]">
            <Button type="button" variant="outline" className="w-full" onClick={handle}>
              Apagar usuário
            </Button>
            <Button type="submit" className="w-full">
              Atualizar
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};
