"use client";

import { ErrorComponent, ErrorComponentInterface } from "@/components";

export default function Error(props: ErrorComponentInterface) {
  const { error, reset } = props;

  return (
    <ErrorComponent
      error={{
        ...error,
        message: "Aconteceu um imprevisto!",
      }}
      reset={reset}
    />
  );
}
