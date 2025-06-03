'use client';

import { signOut } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LogoutPage() {
  const fetch = useCallback(async () => {
    await signOut();
    toast.error('Sua sessão expirou! Faça login novamente.', { duration: 8000 });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return <></>;
}
