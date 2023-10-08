import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Informe o endereço de e-mail!"),
  password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres!").required("Informe uma senha!"),
});
