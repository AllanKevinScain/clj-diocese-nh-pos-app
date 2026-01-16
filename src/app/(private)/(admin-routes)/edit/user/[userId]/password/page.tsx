'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button, Container } from '@/components';
import { useUsers } from '@/hooks';
import type { ReturnHandlerApiType } from '@/types';
import type { UserPasswordSchemaInferType, UserSchemaInferType } from '@/yup/user-schema';
import { userPasswordSchema } from '@/yup/user-schema';

import { Password } from './components/password';

export default function EditPasswordUserPage() {
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  const client = useQueryClient();

  const { updateUserPassword } = useUsers();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserPasswordSchemaInferType>({
    resolver: yupResolver(userPasswordSchema),
  });

  const onSubmit = async (data: UserPasswordSchemaInferType) => {
    await updateUserPassword.mutateAsync(
      { ...data, id: params.userId },
      {
        onSuccess: (data: ReturnHandlerApiType<UserSchemaInferType>) => {
          toast.success(data.message);
          client.refetchQueries({ queryKey: ['users'] });
          router.push('/view/users');
        },
        onError: (e) => toast.error(e.message),
      },
    );
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
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={router.back}
            isLoading={updateUserPassword.isPending}>
            Cancelar
          </Button>
          <Button type="submit" className="w-full" isLoading={updateUserPassword.isPending}>
            Atualizar
          </Button>
        </div>
      </form>
    </Container>
  );
}
