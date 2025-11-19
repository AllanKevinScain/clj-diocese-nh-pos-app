import * as yup from 'yup';

import { posDefault } from '../pos-default';

export const candidatePoslSchemaBase = yup.object({
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
export type CandidatePoslSchemaBaseInfertype = yup.InferType<typeof candidatePoslSchemaBase>;

export const candidatePoslSchema = posDefault.concat(candidatePoslSchemaBase);
export type CandidatePoslSchemaInfertype = yup.InferType<typeof candidatePoslSchema>;
