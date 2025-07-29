import type * as yup from 'yup';

export const fieldNullisRequired: yup.TestFunction<boolean | null | undefined, yup.AnyObject> = (
  value,
) => {
  if (value === null) return false;
  return true;
};
