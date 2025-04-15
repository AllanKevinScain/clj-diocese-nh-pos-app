import * as yup from "yup";

export const userSchema = yup.object().shape({
  id: yup.string().uuid(),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  loginType: yup
    .mixed<"admin" | "manager">()
    .oneOf(["admin", "manager"])
    .required("Tipo de login é obrigatório"),
  name: yup.string().required("Nome é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
});

export const registerUserSchema = userSchema.shape({
  password: yup.string().required("Senha é obrigatória"),
});
