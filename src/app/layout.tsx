import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { twMerge } from 'tailwind-merge';

import { Providers } from '@/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Login',
  description: 'Página de autenticação',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;

  return (
    <html lang="pt-br" className={twMerge(theme === 'dark' ? 'dark' : '')}>
      <body
        className={twMerge(
          geistSans.variable,
          geistMono.variable,
          'relative antialiased',
          'h-screen overflow-y-auto',
        )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
