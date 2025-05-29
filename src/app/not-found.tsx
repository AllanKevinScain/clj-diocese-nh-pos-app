'use client';

import { Button } from '@headlessui/react';
import { Container, Typography } from '@mui/material';

export default function notFound() {
  return (
    <Container>
      <div className="mx-auto flex h-screen w-[50%] flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center">
          <Typography variant="h1" className="mb-2 !text-[26px] font-semibold" color="primary">
            Essa página não foi identificada!
          </Typography>
          <div className="before:bg-gradient-radial after:bg-gradient-conic after:via-ternary-200 before:dark:to-ternary-700 after:dark:from-ternary-900 after:dark:via-ternary-500 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:blur-2xl after:content-[''] before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:opacity-1">
            <img
              className="relative border-b-[2px] border-white"
              src="/page_not_found.png"
              alt="Next.js Logo"
            />
          </div>
        </div>

        <Button
          className="text-fontsColor-200 relative animate-pulse p-4"
          type="button"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.assign('/login');
            }
          }}>
          Recarregar
        </Button>
      </div>
    </Container>
  );
}
