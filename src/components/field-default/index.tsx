"use client";

import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

type CutTextfielProps = Pick<TextFieldProps, "type" | "variant" | "label">;

export interface FieldDefaultInterface<T extends FieldValues>
  extends CutTextfielProps {
  id: Path<T>;
  control: Control<T> | undefined;
  defaultValue: string | boolean | string[];
  customLabel?: React.ReactNode;
  onChange?: (value: string) => string;
}

const WithCustomLabel = ({
  customLabel,
  children,
}: {
  customLabel: React.ReactNode;
  children: React.ReactNode;
}) => {
  if (customLabel?.toString()) {
    return (
      <div className="flex flex-col">
        {customLabel}
        {children}
      </div>
    );
  }

  return children;
};

export const FieldDefault = <T extends FieldValues>(
  props: FieldDefaultInterface<T>
) => {
  const { control, id, defaultValue, onChange, customLabel, ...rest } = props;

  return (
    <WithCustomLabel customLabel={customLabel}>
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
              error={!!formState.errors[id]}
              helperText={errorMessage}
            />
          );
        }}
      />
    </WithCustomLabel>
  );
};
