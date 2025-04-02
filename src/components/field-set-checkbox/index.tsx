"use client";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { red } from "@mui/material/colors";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

export interface FieldSetCheckboxInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  label: string;
  options: { id: string; label: string }[];
}

export const FieldSetCheckbox = <T extends FieldValues>(
  props: FieldSetCheckboxInterface<T>
) => {
  const { label, options = [], id, control } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={[] as PathValue<T, Path<T>>}
      render={({ field, formState }) => {
        const value = field.value as string[];
        const hasError = !!formState.errors[id];
        const errorMessage = formState.errors[id]?.message as string;

        return (
          <FormControl component="fieldset" error={hasError}>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup row>
              {options.map(({ id, label: optLabel }) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      {...field}
                      checked={value.includes(id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...value, id]);
                        } else {
                          field.onChange(
                            value.filter((value: string) => value !== id)
                          );
                        }
                      }}
                      sx={
                        hasError
                          ? {
                              color: red[800],
                              "&.Mui-checked": {
                                color: red[600],
                              },
                            }
                          : {}
                      }
                    />
                  }
                  sx={{ color: hasError ? red[700] : "inherit" }}
                  label={optLabel}
                />
              ))}
            </FormGroup>
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
