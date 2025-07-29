import { isEmpty } from 'lodash';
import * as yup from 'yup';

import { fieldNullisRequired } from '../helpers';
import { posDefault } from '../pos-default';

function requiredCourseOne(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (parent.hasCourseOne) {
    return !isEmpty(value);
  }
  return true;
}
function requiredCourseTwo(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (parent.hasCourseTwo) {
    return !isEmpty(value);
  }
  return true;
}
function requiredCourseThree(value: string | undefined | null, { parent }: yup.AnyObject) {
  if (parent.hasCourseThree) {
    return !isEmpty(value);
  }
  return true;
}

const coupleSchemaBase = yup.object({
  recordCouple: yup.object({
    recordId: yup.string().optional(),

    // tipo de casal no curso
    workPreference: yup.string().oneOf(['sala', 'cozinha']).required('Campo obrigatório!'),
    externalCouple: yup
      .boolean()
      .nullable()
      .test({ test: fieldNullisRequired, message: 'Campo obrigatório!' }),
    cookCouple: yup
      .boolean()
      .nullable()
      .test({ test: fieldNullisRequired, message: 'Campo obrigatório!' }),

    // informações da mulher
    womanName: yup.string().required('Campo obrigatório!'),
    womanNickname: yup.string().required('Campo obrigatório!'),
    womanPhone: yup.string().required('Campo obrigatório!'),
    womanInstagram: yup.string().required('Campo obrigatório!'),
    womanBirthDate: yup.string().required('Campo obrigatório!'),

    // sobre cursos ja feitos
    coursesOneDone: yup
      .string()
      .nullable()
      .test({ test: requiredCourseOne, message: 'Campo obrigatório' }),
    coursesTwoDone: yup
      .string()
      .nullable()
      .test({ test: requiredCourseTwo, message: 'Campo obrigatório' }),
    coursesThreeDone: yup
      .string()
      .nullable()
      .test({ test: requiredCourseThree, message: 'Campo obrigatório' }),
    coursesDone: yup.string().required('Campo obrigatório!'),

    // função na paroquia
    currentGroupFunction: yup.string().required('Campo obrigatório'),
    participatedOtherGroups: yup.string().required('Campo obrigatório'),

    // vida espiritual
    womanSpiritualLife: yup.array().of(yup.string()).min(1, 'Campo Obrigatório!'),
    familyLife: yup
      .string()
      .oneOf(['boa', 'regular', 'inexistente'])
      .required('Campo obrigatório!'),

    // sobre o casamento
    religiousWeddingDate: yup.string().required('Campo obrigatório!'),
    participatedInRetreat: yup
      .boolean()
      .nullable()
      .test({ test: fieldNullisRequired, message: 'Campo obrigatório!' }),
    motivationToParticipate: yup.string().required('Campo obrigatório!'),

    // indicações
    parishIndication: yup.array().of(yup.string()).min(1, 'Campo Obrigatório!'),

    // -------- campo de auxilio - não vai pro back
    hasCourseOne: yup
      .boolean()
      .nullable()
      .test({ test: fieldNullisRequired, message: 'Campo obrigatório!' }),
    hasCourseTwo: yup
      .boolean()
      .nullable()
      .test({ test: fieldNullisRequired, message: 'Campo obrigatório!' }),
    hasCourseThree: yup
      .boolean()
      .nullable()
      .test({ test: fieldNullisRequired, message: 'Campo obrigatório!' }),
  }),
});

export const workSchema = posDefault
  .concat(coupleSchemaBase)
  .omit(['allergy', 'birthDate', 'disease', 'hasDisease', 'medication', 'takesMedication']);
