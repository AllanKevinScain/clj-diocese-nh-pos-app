import type { SxProps, TextFieldProps } from '@mui/material';
import type { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

type CutTextfielProps = Pick<TextFieldProps, 'type' | 'variant' | 'label'>;

interface ComumInputsPropertiesInterface<T extends FieldValues> {
  id: Path<T>;
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  sx?: SxProps;
  placeholder?: string;
}

export type ComumDefaultInputInterface<T extends FieldValues> = ComumInputsPropertiesInterface<T>;

export interface ComumDecimalInputInterface<T extends FieldValues>
  extends ComumInputsPropertiesInterface<T> {
  showCifrao?: boolean;
  onChangeValue?: (_: string | number) => void;
}

export interface FieldDefaultInterface<T extends FieldValues>
  extends CutTextfielProps,
    Omit<ComumDefaultInputInterface<T>, 'field'>,
    Omit<ComumDecimalInputInterface<T>, 'field'> {
  id: Path<T>;
  control: Control<T> | undefined;
  defaultValue?: string | boolean | string[];
  onChange?: (value: string) => string;
  isLoading?: boolean;
  isDecimal?: boolean;
  customLabel?: React.ReactNode;
}
