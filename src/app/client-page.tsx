'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import { Button, FieldDefault } from '@/components';
import { loginSchema } from '@/yup';

type LoginSchemaInferType = InferType<typeof loginSchema>;

export function ClientPage() {
  const navigate = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<LoginSchemaInferType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'teste@gmail.com',
      password: 'teste123!',
    },
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold">Entrar na sua conta</h1>
        <img
          src="https://cljdiocesenh.com.br/wp-content/uploads/2020/03/logo-Curso-de-Lideran%C3%A7a.png"
          alt="Logo"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldDefault id="email" control={control} label="Digite seu e-mail" />

          <FieldDefault
            id="password"
            control={control}
            label="Digite sua senha"
            type="password"
            showEye
          />

          <Button type="submit" loading={isLoading}>
            Entrar
          </Button>
        </form>

        {/* <div className="text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Esqueci minha senha
          </a>
        </div> */}
      </div>
    </div>
  );
}
