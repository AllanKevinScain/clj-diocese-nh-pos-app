import type * as yup from 'yup';

export const fieldNullIsRequired: yup.TestFunction<
  boolean | string | null | undefined,
  yup.AnyObject
> = (value) => {
  if (value === null) return false;
  return true;
};
