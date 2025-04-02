"use client";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { red } from "@mui/material/colors";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

export interface FieldSetRadioInterface<T extends FieldValues> {
  id: Path<T>;
  control: Control<T> | undefined;
  label: string;
  options: { id: string; label: string }[];
}

export const FieldSetRadio = <T extends FieldValues>(
  props: FieldSetRadioInterface<T>
) => {
  const { label, options = [], id, control } = props;

  return (
    <Controller
      name={id}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field, formState }) => {
        const hasError = !!formState.errors[id];
        const errorMessage = formState.errors[id]?.message as string;

        return (
          <FormControl component="fieldset" error={hasError}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              {...field}
              row
              aria-labelledby={`demo-radio-buttons-group-${name}`}
              defaultValue=""
            >
              {options.map(({ id, label: optLabel }) => {
                return (
                  <FormControlLabel
                    key={id}
                    value={id}
                    control={
                      <Radio
                        onClick={() => {
                          if (field.value === id) {
                            field.onChange("");
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
