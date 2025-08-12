import { isEmpty } from 'lodash';
import type * as yup from 'yup';

export const fieldNullIsRequired: yup.TestFunction<
  boolean | string | null | undefined,
  yup.AnyObject
> = (value) => {
  if (value === null) return false;
  return true;
};

export function requiredDoingConfirmation(
  value: boolean | undefined | null,
  { parent }: yup.AnyObject,
) {
  if (parent.hasConfirmation) {
    if (value === null) return true;

    return false;
  }

  return true;
}
export function requiredIsNotMakesonfirmation(
  value: string | undefined | null,
  { parent }: yup.AnyObject,
) {
  if (parent.hasConfirmation && parent.doingConfirmation) {
    return isEmpty(value);
  }

  return true;
}
