'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { VscColorMode } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

import { Loading } from '@/components';

type DarkModeType = 'dark' | null;

interface DarkModeContextInterface {
  toggleTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextInterface>({
  toggleTheme: () => null,
});

interface DarkModeProviderInterface {
  children: React.ReactNode;
}

export const DarkModeProvider = ({ children }: DarkModeProviderInterface) => {
  const [mode, setMode] = useState<DarkModeType>(null);
  const [loading, setLoading] = useState(true);

  const applyTheme = useCallback((theme: DarkModeType) => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      document.cookie = `theme=dark; path=/; max-age=${60 * 60 * 24 * 365}`;
    } else {
      root.classList.remove('dark');
      document.cookie = `theme=light; path=/; max-age=${60 * 60 * 24 * 365}`;
    }

    setMode(theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((current) => {
      const newTheme = current === 'dark' ? null : 'dark';
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  useEffect(() => {
    const cookieMatch = document.cookie.match(/theme=(dark|light)/);
    const savedTheme: DarkModeType = cookieMatch?.[1] === 'dark' ? 'dark' : null;
    applyTheme(savedTheme);
    setLoading(false);
  }, [applyTheme]);

  return (
    <DarkModeContext.Provider value={{ toggleTheme }}>
      <main className={twMerge('relative', 'h-screen', 'flex flex-col')}>
        <button
          onClick={toggleTheme}
          className={twMerge(
            'fixed top-0 right-0 z-[3] cursor-pointer',
            'transition-all duration-300',
            'p-[16px]',
            mode === 'dark' ? 'rotate-180 text-neutral-100' : 'rotate-0 text-neutral-900',
          )}>
          <VscColorMode size={45} />
        </button>

        {loading ? <Loading /> : children}
      </main>
    </DarkModeContext.Provider>
  );
};
