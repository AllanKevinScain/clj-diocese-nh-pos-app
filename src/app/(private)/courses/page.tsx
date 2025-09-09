import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth-config';

import { CoursesClientPage } from './client-page';

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);

  return <CoursesClientPage loginType={session?.user.loginType || 'manager'} />;
}
