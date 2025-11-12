import * as yup from 'yup';

import { posDefault } from '../pos-default';

// function requiredInstrument(value: string | undefined | null, { parent }: yup.AnyObject) {
//   if (parent.playInstrument) {
//     return !isEmpty(value);
//   }

//   return true;
// }
const teamWorkSchema = yup.object().shape({
  recordWork: yup.object({
    recordId: yup.string().optional(),

    // cursos que participou
    // courseOneDone: yup.string().required('Campo obrigatório'),
    // courseTwoDone: yup.string().required('Campo obrigatório'),
    // courseThreeDone: yup.string(),
    // workedInWhichCourses: yup.string().required('Campo obrigatório'),

    // termos de responsabilidade
    // graceStateAwareness: yup.string().required('Campo obrigatório'),
    // notFalsifyData: yup
    //   .boolean()
    //   .nullable()
    //   .test({ test: fieldNullIsRequired, message: 'Campo obrigatório!' }),
    // showLifeTestimony: yup.string().required('Campo obrigatório'),

    // função na paroquia
    // currentGroupFunction: yup.string().required('Campo obrigatório'),
    // parishActivities: yup.string().required('Campo obrigatório'),

    // trabalho
    // reasonToWork: yup.string().required('Campo obrigatório'),
    // workPreference: yup.string().required('Campo obrigatório'),
    // willingToOtherFunction: yup
    //   .boolean()
    //   .nullable()
    //   .test({ test: fieldNullIsRequired, message: 'Campo obrigatório!' }),
    // parishIndication: yup.array().of(yup.string()).min(1, 'Campo Obrigatório!'),

    // Crisma
    // notConfirmationBecause: yup.string().nullable().test({
    //   test: requiredIsNotMakesonfirmation,
    //   message: 'Campo obrigatório!',
    // }),
    // doingConfirmation: yup.boolean().nullable().test({
    //   test: requiredDoingConfirmation,
    //   message: 'Campo obrigatório!',
    // }),

    // -------- campo de auxilio - não vai pro back
    // hasConfirmation: yup.boolean().nullable().test({
    //   test: fieldNullIsRequired,
    //   message: 'Campo obrigatório!',
    // }),

    // Instrumento
    // instrument: yup.string().nullable().test({
    //   message: 'Campo obrigatório!',
    //   test: requiredInstrument,
    // }),
    // -------- campo de auxilio - não vai pro back
    // playInstrument: yup.boolean().nullable().test({
    //   test: fieldNullIsRequired,
    //   message: 'Campo obrigatório!',
    // }),
  }),
});
export type TeamWorkSchemaBaseInfertype = yup.InferType<typeof teamWorkSchema>;

export const workSchema = posDefault.concat(teamWorkSchema);
// .omit(['medication', 'disease', 'hasDisease', 'takesMedication', 'allergy']);

export type WorkSchemaInfertype = yup.InferType<typeof workSchema>;
