'use client';

import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';

interface AcceptModalInterface {
  isOpen: boolean;
  accept: () => void;
  handle: () => void;
}

export const AcceptModal = (props: AcceptModalInterface) => {
  const { isOpen, accept, handle } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={handle}>
        <div className="min-h-screen px-4 text-center">
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="my-8 inline-block w-full max-w-xs transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Deseja confirmar?
              </Dialog.Title>
              <div className="mt-2 text-sm text-gray-500">
                Essa ação é irreversível. Tem certeza?
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onClick={() => {
                    accept();
                    handle();
                  }}>
                  Sim
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  onClick={handle}>
                  Não
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
