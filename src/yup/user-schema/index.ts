import * as yup from 'yup';

const testPassword: yup.TestFunction<string, yup.AnyObject> = (value) => {
  if (value.length < 8) return false;

  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/]).+$/;
  return regex.test(value);
};

const testPasswordIsEqual: yup.TestFunction<string, yup.AnyObject> = (value, { parent }) => {
  if (parent.newPassword === value) return true;
};

export const userSchema = yup.object().shape({
  id: yup.string().uuid(),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  loginType: yup
    .mixed<'admin' | 'manager' | 'builder-manager'>()
    .oneOf(['admin', 'manager', 'builder-manager'])
    .required('Tipo de login é obrigatório'),
  name: yup.string().required('Nome é obrigatório'),
  coName: yup.string().required('Nome é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  active: yup.boolean().optional(),
  createdAt: yup.string().optional(),
  updatedAt: yup.string().optional(),
});
export type UserSchemaInferType = yup.InferType<typeof userSchema>;

export const registerUserSchema = userSchema.shape({
  password: yup.string().required('Senha é obrigatória').test({
    test: testPassword,
    message: 'Essa senha não é válida!',
  }),
});
export type RegisterUserSchemaInferType = yup.InferType<typeof registerUserSchema>;

export const userPasswordSchema = registerUserSchema.pick(['password', 'id']).shape({
  newPassword: yup.string().required('Senha é obrigatória').test({
    test: testPassword,
    message: 'Essa senha não é válida!',
  }),
  confirmNewPassword: yup
    .string()
    .required('Campo orbigatório!')
    .test({ test: testPasswordIsEqual, message: 'Senhas divergentes!' }),
});
export type UserPasswordSchemaInferType = yup.InferType<typeof userPasswordSchema>;

const _parishSchema = yup.object().shape({
  id: yup.string(),
  coName: yup.string(),
});
export type ParishesSchemaInferType = yup.InferType<typeof _parishSchema>;
