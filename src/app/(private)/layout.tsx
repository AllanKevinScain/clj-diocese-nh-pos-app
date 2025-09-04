import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';
import { NavBar } from '@/components';

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  if (session.error) redirect('/logout');

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
