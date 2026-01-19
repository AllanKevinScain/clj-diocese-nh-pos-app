import { Heading } from '../heading';

interface SessionFormInterface {
  title: string;
  children: React.ReactNode;
}

export const SessionForm = (props: SessionFormInterface) => {
  const { title, children } = props;

  return (
    <div className="mb-6">
      <Heading as="h3" className="font-[700]">
        {title}
      </Heading>
      <div className="grid grid-cols-1 gap-4">{children}</div>
    </div>
  );
};
