export interface SessionFormInterface {
  title: string;
  children: React.ReactNode;
}

export const SessionForm = (props: SessionFormInterface) => {
  const { title, children } = props;

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};
