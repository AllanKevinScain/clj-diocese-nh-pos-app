'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

interface AcceptModalInterface {
  isOpen: boolean;
  accept: () => void;
  handle: () => void;
}

export const AcceptModal = (props: AcceptModalInterface) => {
  const { isOpen, accept, handle } = props;

  return (
    <Dialog open={isOpen} as="div" className="relative z-10" onClose={handle}>
      <div
        className={twMerge(
          'fixed inset-0 z-10',
          'flex items-center justify-center',
          'min-h-full p-4',
        )}>
        <DialogPanel transition className="w-full max-w-md rounded-xl bg-white p-6">
          <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
            Deseja confirmar?
          </DialogTitle>
          <h4 className="mt-2 text-sm text-gray-500">Essa ação é irreversível. Tem certeza?</h4>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              className={twMerge(
                'inline-flex justify-center',
                'text-sm font-medium text-white',
                'hover:bg-blue-700',
                'focus:ring-2 focus:ring-blue-500 focus:outline-none',
                'rounded-md bg-blue-600 px-4 py-2',
              )}
              onClick={() => {
                accept();
                handle();
              }}>
              Sim
            </button>
            <button
              type="button"
              className={twMerge(
                'inline-flex justify-center',
                'text-sm font-medium text-gray-700',
                'hover:bg-gray-300',
                'focus:ring-2 focus:ring-gray-400 focus:outline-none',
                'rounded-md bg-gray-200 px-4 py-2',
              )}
              onClick={handle}>
              Não
            </button>
          </div>
        </DialogPanel>
      </div>
      <div className="fixed inset-0 z-9 w-screen overflow-y-auto bg-black opacity-50" />
    </Dialog>
  );
};
