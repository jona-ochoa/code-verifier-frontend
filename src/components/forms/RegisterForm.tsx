// import {useState} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/AuthService';
import { AxiosResponse } from 'axios';

const registerSchema = Yup.object().shape(
  {
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email Format').required('Email is required'),
    password: Yup.string().min(4, 'Minimo 3 character').max(10, 'Max 10 characters').required('Password is required'),
    confirm: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    age: Yup.number().min(18, 'You must  be over 18 years old').required('Age is required')
  }
)

const RegisterForm = () => {
  const initialCredential = {
    email: '',
    password: '',
    name: '',
    confirm: '',
    age: 18
  }
  console.log(initialCredential)
  return (
    <div>
      <h4>Register Form</h4>
      {/* FORMIK COMPONENT */}
      <Formik
        initialValues={initialCredential}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          register(values.name, values.email, values.password, values.age).then((response: AxiosResponse) => {
            if (response.status === 200) {
              alert(JSON.stringify(response.data))
              console.log(response.data)
            } else {
              throw new Error('Error server')
            }
          }).catch((error) => {
            console.error("[Register Error]: ", error);
          })

        }}
      >
        {
          ({ 
            // values, 
            touched, 
            errors, 
            isSubmitting, 
            // handleChange, 
            // handleBlur 
          }) =>
          (
            <Form>
              <label htmlFor="name">Name</label>
              <Field id="name" type="text" name="name" placeholder="Example" />
              {errors.name && touched.name && (
                <ErrorMessage name="name" component="div"></ErrorMessage>
              )}

              <label htmlFor="email">Email</label>
              <Field id="email" type="email" name="email" placeholder="example@email.com" />
              {errors.email && touched.email && (
                <ErrorMessage name="email" component="div"></ErrorMessage>
              )}

              <label htmlFor="password">Password</label>
              <Field id="password" type="password" name="password" placeholder="Password" />
              {errors.password && touched.password && (
                <ErrorMessage name="password" component="div"></ErrorMessage>
              )}

              <label htmlFor="confirm">Confirm Password</label>
              <Field id="confirm" type="password" name="confirm" placeholder="Confirm Password" />
              {errors.confirm && touched.confirm && (
                <ErrorMessage name="confirm" component="div"></ErrorMessage>
              )}

              <label htmlFor="age">Age</label>
              <Field id="age" type="number" name="age" />
              {errors.age && touched.age && (
                <ErrorMessage name="age" component="div"></ErrorMessage>
              )}

              <button type="submit">Register</button>

              {isSubmitting ? (<p>Dending data to registry...</p>) : null}

            </Form>
          )
        }

      </Formik>
    </div>
  )
}

export default RegisterForm