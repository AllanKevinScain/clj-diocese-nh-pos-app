import * as yup from 'yup';

import { posDefault } from '../candidate-pos-default';

const candidatePoslllSchemaBase = yup.object({
  recordPOSlll: yup.object({
    recordId: yup.string().optional(),
  }),
});
export type CandidatePoslllSchemaBaseInfertype = yup.InferType<typeof candidatePoslllSchemaBase>;

export const candidatePoslllSchema = posDefault.concat(candidatePoslllSchemaBase);
export type CandidatePoslllSchemaInfertype = yup.InferType<typeof candidatePoslllSchema>;
