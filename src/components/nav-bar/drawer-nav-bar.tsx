'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
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

  const isAdmin = !isEmpty(data) && data.user.loginType === 'admin';

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  if (!showDrawer) return;

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-2xl">
        <BiMenu size={40} />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition show={isOpen}>
            <TransitionChild as={Fragment}>
              <div className="fixed inset-0 bg-black opacity-50" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild as={Fragment}>
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

                  <nav className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-gray-700">Listagens</span>
                      {/* Itens padrão */}
                      <button
                        onClick={() => handleNavigate('/courses')}
                        className="flex items-center gap-3 rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                        <FaCross className="text-blue-600" />
                        <span>Cursos</span>
                      </button>

                      <button
                        onClick={() => handleNavigate('/poslll')}
                        className="flex items-center gap-3 rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                        <FaUserFriends className="text-blue-600" />
                        <span>CLJs lll</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => handleNavigate('/view/users')}
                          className="flex items-center gap-3 rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                          <FaUserFriends className="text-blue-600" />
                          <span>Usuários</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {!isEmpty(data) && data.user.loginType === 'admin' && (
                        <>
                          <span className="text-gray-700">Cadastros</span>
                          <button
                            onClick={() => handleNavigate('/register/course')}
                            className="flex items-center gap-3 rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                            <FaEdit className="text-blue-600" />
                            <span>Cadastrar curso</span>
                          </button>

                          <button
                            onClick={() => handleNavigate('/register/user')}
                            className="flex items-center gap-3 rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                            <FaUserEdit className="text-blue-600" />
                            <span>Cadastrar usuário</span>
                          </button>

                          <button
                            onClick={() => handleNavigate('/register/poslll')}
                            className="flex items-center gap-3 rounded px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                            <FaEdit className="text-blue-600" />
                            <span>Cadastrar CLJ lll</span>
                          </button>
                        </>
                      )}
                    </div>
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
