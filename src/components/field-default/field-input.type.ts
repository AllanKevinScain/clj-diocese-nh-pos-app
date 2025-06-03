import type { ComponentProps } from 'react';
import type { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

type InputPropsType = ComponentProps<'input'>;

type OmitedInputType = Omit<InputPropsType, 'value' | 'onChange' | 'defaultValue'>;
interface ComumInputsPropertiesInterface<T extends FieldValues> extends OmitedInputType {
  id: Path<T>;
  field: ControllerRenderProps<T, Path<T>>;
  disabled?: boolean;
  placeholder?: string;
}

export interface ComumDefaultInputInterface<T extends FieldValues>
  extends ComumInputsPropertiesInterface<T> {
  showEye?: boolean;
}

export interface ComumDecimalInputInterface<T extends FieldValues>
  extends ComumInputsPropertiesInterface<T> {
  showCifrao?: boolean;
  onChangeValue?: (_: string | number) => void;
}

export interface FieldDefaultInterface<T extends FieldValues>
  extends Omit<ComumDefaultInputInterface<T>, 'field'>,
    Omit<ComumDecimalInputInterface<T>, 'field'> {
  id: Path<T>;
  control: Control<T> | undefined;
  label?: string;
  defaultValue?: string | boolean | string[];
  onChange?: (value: string) => string;
  isLoading?: boolean;
  isDecimal?: boolean;
  customLabel?: React.ReactNode;
}
