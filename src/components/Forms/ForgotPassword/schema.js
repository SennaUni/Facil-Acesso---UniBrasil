import * as Yup from 'yup';

const schema = Yup.object({
    email: Yup.string()
        .email("E-mail inválido")
        .required("Informe o seu e-mail"),
});

export { schema };