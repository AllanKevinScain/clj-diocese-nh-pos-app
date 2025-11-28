import * as yup from 'yup';

import { posDefault } from '../candidate-pos-default';

const teamWorkSchema = yup.object().shape({
  recordWork: yup.object({
    recordId: yup.string().optional(),
  }),
});
export type TeamWorkSchemaBaseInfertype = yup.InferType<typeof teamWorkSchema>;

export const workSchema = posDefault.concat(teamWorkSchema);

export type WorkSchemaInfertype = yup.InferType<typeof workSchema>;
