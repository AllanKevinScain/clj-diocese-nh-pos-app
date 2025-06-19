'use client';

import { NavBarDrawer } from './drawer-nav-bar';
import { NavBarMenu } from './menu-nav-bar';

interface NavBarProps {
  showDrawer?: boolean;
  showMenu?: boolean;
}

export function NavBar({ showDrawer = true, showMenu = true }: NavBarProps) {
  return (
    <header className="flex items-center justify-between bg-blue-600 px-4 py-4 text-white shadow-md">
      <NavBarDrawer showDrawer={showDrawer} />

      <span className="text-lg font-bold">CLJ</span>

      <NavBarMenu showMenu={showMenu} />
    </header>
  );
}
