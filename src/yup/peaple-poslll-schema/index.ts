import * as yup from 'yup';

export const PeapleCljThreeSchema = yup.object({
  id: yup.string().uuid(),
  candidatePhone: yup.string(),
  candidateName: yup.string().required(),
  instagram: yup.string(),
  courseOne: yup
    .number()
    .positive('Número do curso deve ser positivo')
    .required('Número do curso é obrigatório'),
  courseTwo: yup
    .number()
    .positive('Número do curso deve ser positivo')
    .required('Número do curso é obrigatório'),
  courseThree: yup
    .number()
    .positive('Número do curso deve ser positivo')
    .required('Número do curso é obrigatório'),
  formations: yup.string().required(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});
