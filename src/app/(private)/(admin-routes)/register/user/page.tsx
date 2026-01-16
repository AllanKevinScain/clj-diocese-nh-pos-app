'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button, Container, FieldDefault, Heading, SelectDefault } from '@/components';
import { useUsers } from '@/hooks';
import type { ReturnHandlerApiType } from '@/types';
import type { RegisterUserSchemaInferType } from '@/yup/user-schema';
import { registerUserSchema } from '@/yup/user-schema';

import { Password } from './components/password';

export default function RegisterUserClientPage() {
  const router = useRouter();
  const client = useQueryClient();
  const { registerUser } = useUsers();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterUserSchemaInferType>({
    resolver: yupResolver(registerUserSchema),
  });

  const onSubmit = async (data: RegisterUserSchemaInferType) => {
    await registerUser.mutateAsync(data, {
      onSuccess: (data: ReturnHandlerApiType<RegisterUserSchemaInferType>) => {
        toast.success(data.message);
        client.refetchQueries({ queryKey: ['users'] });
        router.push('/view/users');
      },
      onError: (e) => toast.error(e.message),
    });
  };

  return (
    <Container>
      <Heading>Cadastrar usuário</Heading>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FieldDefault id="name" control={control} label="Paróquia/Capela" />

        <FieldDefault
          id="coName"
          control={control}
          label="Sigla do grupo"
          onChange={(e) => String(e).replace(' ', '')}
        />

        <FieldDefault id="email" control={control} label="Email" />

        <Password control={control} errors={errors} id="password" />

        <FieldDefault id="city" control={control} label="Cidade" />

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

        <Button type="submit" className="w-full" isLoading={registerUser.isPending}>
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}
