import { MontageClientPage } from './client-page';

interface MontagePageInterface {
  params: Promise<{ courseNumber: string }>;
}

export default async function MontagePage(props: MontagePageInterface) {
  const { params } = props;
  const { courseNumber } = await params;

  return <MontageClientPage courseNumber={courseNumber} />;
}
