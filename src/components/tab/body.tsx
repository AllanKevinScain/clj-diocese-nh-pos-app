interface BodyInterface {
  children: React.ReactNode;
}

export const Body = ({ children }: BodyInterface) => {
  return (
    <div data-slot="tab-body" className="flex w-full">
      {children}
    </div>
  );
};
