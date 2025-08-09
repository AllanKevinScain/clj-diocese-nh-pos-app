import { getPoslllRecordServerCall } from '@/server-calls';

import { PoslllClientPage } from './client-page';

interface PoslllPageInterface {
  params: Promise<{ poslllId: string }>;
}

export default async function PoslllPage(props: PoslllPageInterface) {
  const { params } = props;
  const { poslllId } = await params;

  const poslll = await getPoslllRecordServerCall(poslllId);

  return <PoslllClientPage poslll={poslll.data} />;
}
