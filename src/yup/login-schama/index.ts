import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().trim().email().required('Campo obrigatório!'),
  password: yup.string().trim().required('Campo obrigatório!'),
});

export type LoginSchemaInferType = yup.InferType<typeof loginSchema>;
