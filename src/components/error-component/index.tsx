'use client';

import { Button } from '@headlessui/react';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export interface ErrorComponentInterface {
  error: Error & { digest?: string };
  reset: () => void;
}

export const ErrorComponent: React.FC<ErrorComponentInterface> = (props) => {
  const { error, reset } = props;
  const { message = 'Ocorreu algo imprevisto!' } = error;
  const session = useSession();
  const route = useRouter();

  const handleLogout = async () => {
    if (session.status === 'authenticated') {
      const response = await signOut({ redirect: false });

      if (response.url !== undefined) {
        route.push('/');
      }
    } else {
      route.refresh();
      route.push('/');
    }
  };

  return (
    <Container>
      <div className="mx-auto flex h-screen w-[50%] flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-2 max-w-[300px] font-semibold whitespace-nowrap">{message}</h2>
          <div className="before:bg-gradient-radial after:bg-gradient-conic after:via-ternary-200 before:dark:to-ternary-700 after:dark:from-ternary-900 after:dark:via-ternary-500 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:blur-2xl after:content-[''] before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:opacity-1">
            <img
              className="relative border-b-[2px] border-white"
              src="/logo_clj.jpg"
              alt="Next.js Logo"
            />
          </div>
        </div>

        <Button
          className="text-fontsColor-200 relative p-4"
          type="button"
          onClick={() => {
            handleLogout();
            reset();
          }}>
          Recarregar
        </Button>
      </div>
    </Container>
  );
};
