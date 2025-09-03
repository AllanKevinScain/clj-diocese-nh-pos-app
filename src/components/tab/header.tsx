interface HeaderInterface {
  children: React.ReactNode;
}

export const Header = ({ children }: HeaderInterface) => {
  return (
    <div data-slot="tab-header" className="flex w-full gap-[12px]">
      {children}
    </div>
  );
};
