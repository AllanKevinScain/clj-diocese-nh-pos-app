'use client';

import type { InferType } from 'yup';

import type { registerUserSchema, userSchema } from '@/yup/user-schema';

type UserSchemaInferType = InferType<typeof userSchema>;
type RegisterUserSchemaInferType = InferType<typeof registerUserSchema>;

export function useUsers() {
  async function listUsers() {
    const req = await fetch('/api/user/list', {
      method: 'GET',
    });
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

  async function updateUser(props: UserSchemaInferType) {
    const { id, ...rest } = props;
    const req = await fetch(`/api/user?userId=${id}`, {
      method: 'PUT',
      body: JSON.stringify(rest),
    });

    const res = await req.json();

    return res;
  }

  async function deleteUser(userId: string) {
    const req = await fetch(`/api/user?userId=${userId}`, {
      method: 'DELETE',
    });
    const res = await req.json();
    return res;
  }

  return {
    listUsers,
    registerUser,
    deleteUser,
    updateUser,
  };
}
