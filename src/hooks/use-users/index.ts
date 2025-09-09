'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { InferType } from 'yup';

import type { registerUserSchema, userSchema } from '@/yup/user-schema';

import type { ListUsersReturnInterface } from './use-users.type';

type UserSchemaInferType = InferType<typeof userSchema>;
type RegisterUserSchemaInferType = InferType<typeof registerUserSchema>;

export function useUsers() {
  const router = useRouter();
  async function listUsers(): Promise<ListUsersReturnInterface> {
    const req = await fetch('/api/user/list', { method: 'GET' });
    const res = await req.json();
    return res;
  }

  async function registerUser(props: RegisterUserSchemaInferType) {
    const req = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(props),
    });
    const res = await req.json();
    return res;
  }
  const mutationRegisterUser = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: registerUser,
    onSuccess: (e) => {
      if (!e?.ok) {
        toast.error(e.data.message);
      } else {
        toast.success(e.data.message);
        router.push('/view/users');
      }
    },
    onError: (e) => {
      toast.error(JSON.stringify(e));
    },
  });

  async function updateUser(props: UserSchemaInferType) {
    const { id, ...rest } = props;
    const req = await fetch(`/api/user?userId=${id}`, {
      method: 'PUT',
      body: JSON.stringify(rest),
    });
    const res = await req.json();
    return res;
  }
  const mutationUpdateUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateUser,
    onSuccess: (e) => {
      if (!e?.ok) {
        toast.error(e.data.message);
      } else {
        toast.success(e.data.message);
        router.push('/view/users');
      }
    },
    onError: (e) => {
      toast.error(JSON.stringify(e));
    },
  });

  async function deleteUser(userId: string) {
    const req = await fetch(`/api/user?userId=${userId}`, {
      method: 'DELETE',
    });
    const res = await req.json();
    return res;
  }
  const mutationDeleteUser = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: deleteUser,
    onSuccess: (e) => {
      if (!e?.ok) {
        toast.error(e.data.message);
      } else {
        toast.success(e.data.message);
        router.push('/view/users');
      }
    },
    onError: (e) => {
      toast.error(JSON.stringify(e));
    },
  });

  return {
    listUsers,
    registerUser: mutationRegisterUser.mutateAsync,
    updateUser: mutationUpdateUser.mutateAsync,
    deleteUser: mutationDeleteUser.mutateAsync,
  };
}
