import { getUserServerCall } from '@/server-calls/get-user';

import { EditUserClientPage } from './client-page';

interface EditUserPageInterface {
  params: Promise<{ userId: string }>;
}

export default async function EditUserPage(props: EditUserPageInterface) {
  const { params } = props;
  const { userId } = await params;

  const user = await getUserServerCall(userId);

  return <EditUserClientPage user={user.data} />;
}
