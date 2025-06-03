import type { TextareaProps } from '@headlessui/react';
import type { Control, FieldValues, Path } from 'react-hook-form';

export interface FieldDefaultInterface<T extends FieldValues> extends TextareaProps {
  id: Path<T>;
  control: Control<T> | undefined;
  label?: string;
  isLoading?: boolean;
}
