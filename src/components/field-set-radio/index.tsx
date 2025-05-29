'use client';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { red } from '@mui/material/colors';
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';

export interface FieldSetRadioInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  label: string;
  options: { id: string; label: string }[];
  defaultValue?: string | boolean | string[];
  customOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const FieldSetRadio = <T extends FieldValues>(props: FieldSetRadioInterface<T>) => {
  const {
    label,
    options = [],
    id,
    control,
    defaultValue,
    customOnChange,
    disabled = false,
  } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, formState }) => {
        const hasError = !!formState.errors[id];
        const errorMessage = formState.errors[id]?.message as string;

        return (
          <FormControl component="fieldset" error={hasError} disabled={disabled}>
            <FormLabel component="legend" disabled={disabled}>
              {label}
            </FormLabel>
            <RadioGroup {...field} row defaultValue="">
              {options.map(({ id, label: optLabel }) => {
                return (
                  <FormControlLabel
                    key={id}
                    disabled={disabled}
                    value={id}
                    control={
                      <Radio
                        disabled={disabled}
                        onChange={(e) => {
                          if (field.value === id) {
                            field.onChange('');
                          } else {
                            field.onChange(e.target.value);
                          }
                          if (customOnChange) customOnChange(e);
                        }}
                        sx={
                          hasError
                            ? {
                                color: red[800],
                                '&.Mui-checked': {
                                  color: red[600],
                                },
                              }
                            : {}
                        }
                      />
                    }
                    sx={{ color: hasError ? red[700] : 'inherit' }}
                    label={optLabel}
                  />
                );
              })}
            </RadioGroup>
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
