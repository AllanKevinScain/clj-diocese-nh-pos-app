"use client";

import { ReactNode, useState } from "react";

import { ComponentDialog } from "./component";
import { ErrorModalContext } from "./context";

const ERROR_MODAL_DEFAULT = {
  open: false,
  message: "",
};

export const ErrorModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [errorModal, setErrorModal] = useState(ERROR_MODAL_DEFAULT);

  function handleToggleDialog() {
    setErrorModal((s) => ({ ...s, open: !s.open }));
  }

  const handleOpenErrorModal = (error: Error) => {
    setErrorModal({
      open: true,
      message: error.message,
    });
  };

  return (
    <ErrorModalContext.Provider
      value={{ onClose: handleToggleDialog, onOpen: handleOpenErrorModal }}
    >
      <ComponentDialog
        isOpen={errorModal.open}
        message={errorModal.message}
        onClose={handleToggleDialog}
      />
      {children}
    </ErrorModalContext.Provider>
  );
};
