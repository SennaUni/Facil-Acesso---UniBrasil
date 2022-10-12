import * as Yup from 'yup';

const schema = Yup.object({
    name: Yup.string()
        .required("Informe o seu nome"),
    email: Yup.string()
        .email("E-mail inválido")
        .required("Informe o seu e-mail"),
    password: Yup.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .required("Informe a sua senha"),
    passwordConfirm: Yup.string()
        .oneOf([ Yup.ref('password'), null ], "A senha de confirmação não confere")
        .required("Informe a confirmação da sua senha"),
});

export { schema };