import { useMutation } from '@tanstack/react-query';
import { signIn, signOut } from 'next-auth/react';

import type { LoginSchemaInferType } from '@/yup';

export function useAuth() {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginSchemaInferType) =>
      signIn('credentials', {
        ...data,
        redirect: false,
      }),
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
