import * as yup from 'yup';

export const poslllSchema = yup.object({
  id: yup.string().uuid(),
  candidateName: yup.string().required('Campo obrigatório!'),
  parishChapel: yup.string().required('Campo obrigatório!'),
  instagram: yup.string().required('Campo obrigatório!'),
  courseOne: yup
    .string()
    .matches(/^[0-9]+$/, 'Apenas números positivos são permitidos')
    .required('Campo obrigatório!'),
  courseTwo: yup
    .string()
    .matches(/^[0-9]+$/, 'Apenas números positivos são permitidos')
    .required('Campo obrigatório!'),
  courseThree: yup
    .string()
    .matches(/^[0-9]+$/, 'Apenas números positivos são permitidos')
    .required('Campo obrigatório!'),
  formations: yup.string().required('Campo obrigatório!'),
  active: yup.boolean().optional(),
  createdAt: yup.string().optional(),
  updatedAt: yup.string().optional(),
});

export type PoslllSchemaInferType = yup.InferType<typeof poslllSchema>;
