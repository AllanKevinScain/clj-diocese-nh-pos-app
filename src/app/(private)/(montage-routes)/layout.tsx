import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';

export const metadata: Metadata = {
  title: 'Montagem',
  description: 'Página do montagem',
};

export default async function MontageLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user.loginType === 'manager') {
    redirect('/courses');
  }

  return children;
}
