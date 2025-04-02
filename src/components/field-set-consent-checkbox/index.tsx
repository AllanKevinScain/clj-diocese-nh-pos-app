"use client";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { red } from "@mui/material/colors";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FieldSetCheckboxInterface } from "../field-set-checkbox";

export const FieldSetConsentCheckbox = <T extends FieldValues>(
  props: Omit<FieldSetCheckboxInterface<T>, "options">
) => {
  const { label, id, control } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={false as PathValue<T, Path<T>>}
      render={({ field, formState }) => {
        const value = field.value as boolean;
        const hasError = !!formState.errors[id];

        const errorMessage = formState.errors[id]?.message as string;

        return (
          <FormControl component="fieldset" error={hasError}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={value}
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
                label={label}
              />
            </FormGroup>
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};
