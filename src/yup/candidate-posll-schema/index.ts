import * as yup from 'yup';

import { posDefault } from '../pos-default';

const candidatePosllSchemaBase = yup.object({
  recordPOSll: yup.object({
    recordId: yup.string().optional(),
  }),
});
export type CandidatePosllSchemaBaseInfertype = yup.InferType<typeof candidatePosllSchemaBase>;

export const candidatePosllSchema = posDefault.concat(candidatePosllSchemaBase);
export type CandidatePosllSchemaInfertype = yup.InferType<typeof candidatePosllSchema>;
