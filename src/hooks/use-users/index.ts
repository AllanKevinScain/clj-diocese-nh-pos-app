'use client';

import { useMutation } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import type {
  ParishesSchemaInferType,
  RegisterUserSchemaInferType,
  UserPasswordSchemaInferType,
  UserSchemaInferType,
} from '@/yup/user-schema';

import type { ListParishesReturnInterface, ListUsersReturnInterface } from './use-users.type';

export function useUsers() {
  const router = useRouter();
  async function listUsers(): Promise<ListUsersReturnInterface> {
    const req = await fetch('/api/user/list', { method: 'GET' });
    const res = await req.json();
    return res;
  }

  async function listParishes(): Promise<ListParishesReturnInterface> {
    const req = await fetch('/api/user/list-parishes', { method: 'GET' });
    const res = await req.json();

    if (res.ok && !isEmpty(res?.data)) {
      return {
        ...res,
        data: res?.data.map((parish: ParishesSchemaInferType) => ({
          label: parish.coName,
          value: parish.coName,
        })),
      };
    }

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

  async function changeStatusUser(userId: string) {
    const req = await fetch(`/api/user?userId=${userId}`, {
      method: 'PATCH',
    });
    const res = await req.json();
    return res;
  }
  const mutationChangeStatusUser = useMutation({
    mutationKey: ['changeStatusUser'],
    mutationFn: changeStatusUser,
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

  async function updateUserPassword(props: UserPasswordSchemaInferType) {
    const { id, ...rest } = props;
    const req = await fetch(`/api/user/password?userId=${id}`, {
      method: 'PUT',
      body: JSON.stringify(rest),
    });
    const res = await req.json();
    return res;
  }
  const mutationUpdateUserPassword = useMutation({
    mutationKey: ['updateUserPassword'],
    mutationFn: updateUserPassword,
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
    listParishes,
    registerUser: mutationRegisterUser.mutateAsync,
    updateUser: mutationUpdateUser.mutateAsync,
    changeStatusUser: mutationChangeStatusUser.mutateAsync,
    updateUserPassword: mutationUpdateUserPassword.mutateAsync,
  };
}
