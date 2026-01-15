import { useMutation } from '@tanstack/react-query';
import { signIn, signOut } from 'next-auth/react';

import { identifyStatusError } from '@/helpers';
import type { LoginSchemaInferType } from '@/yup';

export function useAuth() {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginSchemaInferType) => {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      identifyStatusError({ ok: !!res?.ok, message: `${res?.error}`, data: null });

      return res;
    },
  });

  const logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => signOut({ callbackUrl: '/' }),
  });

  return {
    login,
    logout,
  };
}
