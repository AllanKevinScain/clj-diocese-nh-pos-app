import * as yup from 'yup';

import { posDefault } from '../candidate-pos-default';

export const poslSchemaBase = yup.object({
  recordPOSl: yup.object({
    recordId: yup.string().optional(),

    // Padrinho
    godfatherName: yup.string().required('Campo Obrigatório!'),
    godfatherPhone: yup
      .string()
      .min(14, 'Mínimo de 14 caracteres!')
      .max(15, 'Máximo de 15 caracteres!')
      .required('Campo Obrigatório!'),

    // Personalidade
    candidateSpirit: yup.string().required('Campo Obrigatório!'),
    candidateDisposition: yup.string().required('Campo Obrigatório!'),
    candidateParticipation: yup.string().required('Campo Obrigatório!'),
  }),
});
export type PoslSchemaBaseInfertype = yup.InferType<typeof poslSchemaBase>;

export const poslSchema = posDefault.concat(poslSchemaBase);
export type CandidatePoslSchemaInfertype = yup.InferType<typeof poslSchema>;
