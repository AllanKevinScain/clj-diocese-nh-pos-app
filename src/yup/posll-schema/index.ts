import { isEmpty } from 'lodash';
import * as yup from 'yup';

import { posDefault } from '../pos-default';

function requiredDoingConfirmation(value: boolean | undefined | null, { parent }: yup.AnyObject) {
  if (parent.hasConfirmation) {
    if (value !== null) {
      return true;
    }

    return false;
  }

  return true;
}
function requiredIsNotMakesonfirmation(
  value: string | undefined | null,
  { parent }: yup.AnyObject,
) {
  if (parent.hasConfirmation && parent.doingConfirmation) {
    return isEmpty(value);
  }

  return true;
}

const posllSchemaBase = yup.object({
  recordPOSll: yup.object({
    recordId: yup.string().optional(),

    // Consentimento da ficha
    courseOneDone: yup.string().required('Campo obrigatório'),
    motivationToParticipate: yup.string().required('Campo obrigatório'),
    reasonForCLJII: yup.string().required('Campo obrigatório'),
    approachToChrist: yup.string().required('Campo obrigatório'),
    acceptsChurchDoctrine: yup.string().required('Campo obrigatório'),
    commitmentToCLJ: yup.string().required('Campo obrigatório'),
    perseveranceInCommunity: yup.string().required('Campo obrigatório'),
    hideImportantInfo: yup.boolean().required('Campo obrigatório'),

    // função na paroquia e grupo
    currentGroupFunction: yup.string().required('Campo obrigatório'),
    parishChapelActivities: yup.string().required('Campo obrigatório'),

    // Crisma
    notConfirmationBecause: yup.string().nullable().test({
      name: 'requiredIsNotMakesonfirmation',
      message: 'Campo obrigatório!',
      test: requiredIsNotMakesonfirmation,
    }),
    doingConfirmation: yup.boolean().nullable().test({
      name: 'requiredDoingConfirmation',
      message: 'Campo obrigatório!',
      test: requiredDoingConfirmation,
    }),

    // -------- campos de auxilio - não vao pro back
    hasConfirmation: yup.boolean().required('Campo obrigatório'),
  }),
});

export const posllSchema = posDefault.concat(posllSchemaBase);
