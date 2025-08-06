import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useVerifyToken() {
  const { data } = useSession();

  useEffect(() => {
    if (data?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/' });
    }
  }, [data]);
}
