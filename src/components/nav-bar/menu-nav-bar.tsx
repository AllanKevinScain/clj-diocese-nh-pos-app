'use client';

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';

interface NavBarMenuInterface {
  showMenu?: boolean;
}

export function NavBarMenu(props: NavBarMenuInterface) {
  const { showMenu } = props;

  if (!showMenu) return;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="rounded-full">
          <img src="/sao_pedro.jpg" alt="Avatar" className="w-10 rounded-full border" />
        </MenuButton>
      </div>

      <Transition as={Fragment}>
        <MenuItems transition anchor="bottom end" className="rounded-xl border bg-white">
          <div className="py-1">
            <MenuItem>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full px-4 py-2 text-left text-sm text-gray-700">
                Sair
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
