import * as yup from 'yup';

import { posDefault } from '../pos-default';

// function hasConfirmationIsRequired(value: boolean | undefined | null) {
//   if (value === null) return false;

//   return true;
// }

const posllSchemaBase = yup.object({
  recordPOSll: yup.object({
    recordId: yup.string().optional(),

    // Consentimento da ficha
    // courseOneDone: yup.string().required('Campo obrigatório'),
    // motivationToParticipate: yup.string().required('Campo obrigatório'),
    // reasonForCLJII: yup.string().required('Campo obrigatório'),
    // approachToChrist: yup.string().required('Campo obrigatório'),
    // acceptsChurchDoctrine: yup.string().required('Campo obrigatório'),
    // commitmentToCLJ: yup.string().required('Campo obrigatório'),
    // perseveranceInCommunity: yup.string().required('Campo obrigatório'),
    // hideImportantInfo: yup
    //   .boolean()
    //   .nullable()
    //   .test({ test: fieldNullIsRequired, message: 'Campo obrigatório' }),

    // função na paroquia e grupo
    // currentGroupFunction: yup.string().required('Campo obrigatório'),
    // parishChapelActivities: yup.string().required('Campo obrigatório'),

    // // Crisma
    // notConfirmationBecause: yup.string().nullable().test({
    //   test: requiredIsNotMakesonfirmation,
    //   message: 'Campo obrigatório!',
    // }),
    // doingConfirmation: yup.boolean().nullable().test({
    //   test: requiredDoingConfirmation,
    //   message: 'Campo obrigatório!',
    // }),
    // -------- campos de auxilio - não vao pro back
    // hasConfirmation: yup.boolean().nullable().test({
    //   name: 'hasConfirmationIsRequired',
    //   message: 'Campo obrigatório!',
    //   test: hasConfirmationIsRequired,
    // }),
  }),
});
export type PosllSchemaBaseInfertype = yup.InferType<typeof posllSchemaBase>;

export const posllSchema = posDefault.concat(posllSchemaBase);
export type PosllSchemaInfertype = yup.InferType<typeof posllSchema>;
