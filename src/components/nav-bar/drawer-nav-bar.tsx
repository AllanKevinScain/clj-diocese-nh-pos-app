'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, useMemo, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { FaCross, FaEdit, FaUserEdit, FaUserFriends } from 'react-icons/fa';

import { Button } from '../button';

interface NavBarDrawerInterface {
  showDrawer?: boolean;
}

export function NavBarDrawer(props: NavBarDrawerInterface) {
  const { showDrawer } = props;
  const { data } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const drawerItems = useMemo(() => {
    const defaultLists = [{ id: 'courses', content: 'Cursos', Icon: FaCross, path: '/courses' }];
    if (!isEmpty(data) && data.user.loginType !== 'admin') return defaultLists;

    return [
      ...defaultLists,
      {
        id: 'register-courses',
        content: 'Cadastrar curso',
        Icon: FaEdit,
        path: '/register/course',
      },
      {
        id: 'register-users',
        content: 'Cadastrar usuário',
        Icon: FaUserEdit,
        path: '/register/user',
      },
      {
        id: 'view-users',
        content: 'Visualizar todos os usuários',
        Icon: FaUserFriends,
        path: '/view/users',
      },
    ];
  }, [data]);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  if (!showDrawer) return;

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-2xl">
        <BiMenu />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition show={isOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="bg-opacity-25 fixed inset-0 bg-black" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full">
                <DialogPanel className="flex w-72 max-w-full flex-col bg-white p-4 shadow-xl">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src="/logo_clj.jpg"
                      alt="Logo CLJ"
                      className="rounded-full border border-black"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Olá, {data?.user?.name}
                    </span>
                  </div>

                  <hr className="my-3" />

                  <nav className="flex flex-col gap-2">
                    {drawerItems.map(({ id, content, Icon, path }) => (
                      <button
                        key={id}
                        onClick={() => handleNavigate(path)}
                        className="flex items-center gap-3 rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                        <Icon className="text-blue-600" />
                        <span>{content}</span>
                      </button>
                    ))}
                  </nav>

                  <Button variant="ghost" onClick={() => signOut({ callbackUrl: '/' })}>
                    Sair
                  </Button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Transition>
        </Dialog>
      </Transition>
    </>
  );
}
