import { getWorkTableServerCall } from '@/server-calls';

import { MontageClientPage } from './client-page';

interface MontagePageInterface {
  params: Promise<{ courseNumber: string }>;
}

export default async function MontagePage(props: MontagePageInterface) {
  const { params } = props;
  const { courseNumber } = await params;

  const workTable = await getWorkTableServerCall(courseNumber);

  return <MontageClientPage courseNumber={courseNumber} workTable={workTable.data} />;
}
