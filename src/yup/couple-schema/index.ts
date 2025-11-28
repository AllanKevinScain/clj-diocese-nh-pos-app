import * as yup from 'yup';

import { posDefault } from '../candidate-pos-default';

const coupleSchemaBase = yup.object({
  recordCouple: yup.object({
    recordId: yup.string().optional(),

    // informações da mulher
    womanName: yup.string().required('Campo obrigatório!'),
    womanNickname: yup.string().required('Campo obrigatório!'),
    womanPhone: yup.string().required('Campo obrigatório!'),
    // womanInstagram: yup.string().required('Campo obrigatório!'),
    womanBirthDate: yup.string().required('Campo obrigatório!'),
  }),
});
export type CoupleSchemaBaseInfertype = yup.InferType<typeof coupleSchemaBase>;

export const coupleSchema = posDefault.concat(coupleSchemaBase);

export type CoupleSchemaInfertype = yup.InferType<typeof coupleSchema>;
