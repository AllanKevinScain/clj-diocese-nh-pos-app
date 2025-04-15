"use client";

import { MenuItem, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

type CutTextfielProps = Pick<TextFieldProps, "variant" | "label">;

export interface SelectDefaultInterface<T extends FieldValues>
  extends CutTextfielProps {
  id: Path<T>;
  control: Control<T> | undefined;
  defaultValue: string | boolean | string[];
  options: { value: string; label: string }[];
  onChange?: (value: string) => string;
}

export const SelectDefault = <T extends FieldValues>(
  props: SelectDefaultInterface<T>
) => {
  const { control, id, defaultValue, onChange, options, ...rest } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, formState }) => {
        const errorMessage = formState.errors[id]?.message as string;

        return (
          <TextField
            {...field}
            {...rest}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(onChange ? onChange(value) : value);
            }}
            fullWidth
            select
            error={!!formState.errors[id]}
            helperText={errorMessage}
          >
            {options.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};
