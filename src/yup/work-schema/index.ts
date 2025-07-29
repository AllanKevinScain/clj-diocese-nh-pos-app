import { isEmpty } from 'lodash';
import * as yup from 'yup';

import { fieldNullisRequired } from '../helpers';
import { posDefault } from '../pos-default';

function requiredDoingConfirmation(value: boolean | undefined | null, { parent }: yup.AnyObject) {
  if (parent.hasConfirmation) {
    if (value === null) return true;

    return false;
  }

  return true;
}
function requiredInstrument(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (parent.playInstrument) {
    return !isEmpty(value);
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

const teamWorkSchema = yup.object().shape({
  recordWork: yup.object({
    recordId: yup.string().optional(),

    // cursos que participou
    courseOneDone: yup.string().required('Campo obrigatório'),
    courseTwoDone: yup.string().required('Campo obrigatório'),
    courseThreeDone: yup.string(),
    workedInWhichCourses: yup.string().required('Campo obrigatório'),

    // termos de responsabilidade
    graceStateAwareness: yup.string().required('Campo obrigatório'),
    notFalsifyData: yup
      .boolean()
      .nullable()
      .test({ test: fieldNullisRequired, message: 'Campo obrigatório!' }),
    showLifeTestimony: yup.string().required('Campo obrigatório'),

    // função na paroquia
    currentGroupFunction: yup.string().required('Campo obrigatório'),
    parishActivities: yup.string().required('Campo obrigatório'),

    // trabalho
    reasonToWork: yup.string().required('Campo obrigatório'),
    workPreference: yup.string().required('Campo obrigatório'),
    willingToOtherFunction: yup
      .boolean()
      .nullable()
      .test({ test: fieldNullisRequired, message: 'Campo obrigatório!' }),
    parishIndication: yup.array().of(yup.string()).min(1, 'Campo Obrigatório!'),

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
    // -------- campo de auxilio - não vai pro back
    hasConfirmation: yup.boolean().nullable().test({
      test: fieldNullisRequired,
      message: 'Campo obrigatório!',
    }),

    // Instrumento
    instrument: yup.string().nullable().test({
      message: 'Campo obrigatório!',
      test: requiredInstrument,
    }),
    // -------- campo de auxilio - não vai pro back
    playInstrument: yup.boolean().nullable().test({
      test: fieldNullisRequired,
      message: 'Campo obrigatório!',
    }),
  }),
});

export const workSchema = posDefault
  .concat(teamWorkSchema)
  .omit(['medication', 'disease', 'hasDisease', 'takesMedication', 'allergy']);
