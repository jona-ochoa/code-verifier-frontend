import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/AuthService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const loginSchema = Yup.object().shape(
    {
        email: Yup.string().email('Invalid email Format').required('Email is required'),
        password: Yup.string().min(4, 'Minimo 3 character').max(10, 'Max 10 characters').required('Password is required')
    }
)

const LoginForm = () => {
    const initialCredential = {
        email: '',
        password: ''
    }
    console.log(initialCredential);

    const navigate = useNavigate();

    return (
        <div>
            <h4>Login Form</h4>
            {/* FORMIK COMPONENT */}
            <Formik
                initialValues={initialCredential}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    login(values.email, values.password).then(async (response: AxiosResponse) => {
                        if (response.status === 200) {
                            if (response.data.token) {
                                await sessionStorage.setItem('sessionJWTToken', response.data.token)
                                navigate('/');
                            } else {
                                throw new Error('Invalid token')
                            }
                        } else {
                            throw new Error('Error server')
                        }
                    }).catch((error) => {
                        console.error("[Login Error]: ", error);
                    })

                }}
            >
                {
                    ({
                        // values, 
                        touched,
                        errors,
                        isSubmitting,
                        // handleChange, handleBlur 
                    }) =>
                    (
                        <Form>
                            <label htmlFor="email">Email</label>
                            <Field id="email" type="email" name="email" placeholder="example@email.com" />
                            {errors.email && touched.email && (
                                <ErrorMessage name="email" component="div"></ErrorMessage>
                            )}

                            <label htmlFor="password">Password</label>
                            <Field id="password" type="password" name="password" placeholder="1234Asdf" />
                            {errors.password && touched.password && (
                                <ErrorMessage name="password" component="div"></ErrorMessage>
                            )}

                            <button type="submit">Login</button>

                            {isSubmitting ? (<p>Checking credentials...</p>) : null}

                        </Form>
                    )
                }

            </Formik>
        </div>
    )
}

export default LoginForm;
