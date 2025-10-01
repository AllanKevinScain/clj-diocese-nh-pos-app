'use client';

import { createContext, useState } from 'react';

export type DarkModeType = 'dark' | null;

interface TabContextInterface {
  changeTab: (tab: number) => void;
  activeTab: number;
}

export const TabContext = createContext<TabContextInterface>({
  changeTab: () => null,
  activeTab: 0,
});

interface TabProviderInterface {
  children: React.ReactNode;
}

export const TabProvider = ({ children }: TabProviderInterface) => {
  const [tab, setTab] = useState(0);

  const changeTab = (newTab: number) => {
    setTab(newTab);
  };

  return (
    <TabContext.Provider value={{ changeTab, activeTab: tab }}>
      <div className="flex w-full flex-col gap-[12px]">{children}</div>
    </TabContext.Provider>
  );
};
