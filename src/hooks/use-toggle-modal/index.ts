'use client';

import { useState } from 'react';

export function useToggleModal() {
  const [isOpenToggleModal, setIsOpenToggleModal] = useState(false);

  function handleModal() {
    setIsOpenToggleModal((s) => !s);
  }

  return {
    isOpen: isOpenToggleModal,
    handle: handleModal,
  };
}
