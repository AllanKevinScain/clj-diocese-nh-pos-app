'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { AcceptModal, Button, Container, FieldDefault, Heading, SelectDefault } from '@/components';
import { useToggleModal, useUsers } from '@/hooks';
import type { UserSchemaInferType } from '@/yup/user-schema';
import { userSchema } from '@/yup/user-schema';

interface EditUserClientPageInterface {
  user: UserSchemaInferType;
}

export const EditUserClientPage = (props: EditUserClientPageInterface) => {
  const { user } = props;

  const { updateUser, changeStatusUser } = useUsers();
  const { isOpen, handle } = useToggleModal();

  const isActive = user.active;

  const { handleSubmit, control } = useForm<UserSchemaInferType>({
    resolver: yupResolver(userSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: UserSchemaInferType) => {
    await updateUser(data);
  };

  async function deleteUserById() {
    await changeStatusUser(user.id!);
  }

  return (
    <>
      <AcceptModal isOpen={isOpen} handle={handle} accept={deleteUserById} />

      <Container>
        <Heading>Edição do usuário {user.name}</Heading>
        <Heading as="h2">{user.loginType}</Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FieldDefault id="name" control={control} label="Nome" />

          <FieldDefault id="coName" control={control} label="Sigla do grupo" />

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

          <Button
            variant="ghost"
            isLink
            href={`/edit/user/${user.id}/password`}
            className="justify-start">
            Aleterar senha
          </Button>

          <div className="flex gap-[16px]">
            <Button type="button" variant="outline" className="w-full" onClick={handle}>
              {isActive ? 'Desativar' : 'Ativar'} usuário
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
