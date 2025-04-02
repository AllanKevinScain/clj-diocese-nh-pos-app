"use client";

import { createContext } from "react";

export interface ComponentDialogInterface {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
}

export interface ErrorModalContextInterface {
  onOpen: (error: Error) => void;
  onClose: () => void;
}

export const ErrorModalContext = createContext<ErrorModalContextInterface>({
  onClose: () => null,
  onOpen: () => null,
});
