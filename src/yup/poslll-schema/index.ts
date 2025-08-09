import * as yup from 'yup';

export const poslllSchema = yup.object({
  id: yup.string().uuid(),
  candidatePhone: yup.string().required('Campo obrigatório!'),
  candidateName: yup.string().required('Campo obrigatório!'),
  instagram: yup.string().required('Campo obrigatório!'),
  courseOne: yup.string().required('Campo obrigatório!'),
  courseTwo: yup.string().required('Campo obrigatório!'),
  courseThree: yup.string().required('Campo obrigatório!'),
  formations: yup.string().required('Campo obrigatório!'),
  createdAt: yup.string(),
  updatedAt: yup.string(),
});
