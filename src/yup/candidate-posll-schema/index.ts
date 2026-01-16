import * as yup from 'yup';

import { posDefault } from '../candidate-pos-default';

const posllSchemaBase = yup.object({
  recordPOSll: yup.object({
    recordId: yup.string().optional(),
  }),
});
export type PosllSchemaBaseInfertype = yup.InferType<typeof posllSchemaBase>;

export const posllSchema = posDefault.concat(posllSchemaBase);
export type CandidatePosllSchemaInfertype = yup.InferType<typeof posllSchema>;
