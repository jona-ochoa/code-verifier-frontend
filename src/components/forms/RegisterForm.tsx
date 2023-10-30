import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/AuthService';
import { AxiosResponse } from 'axios';
import {
  Container,
  Typography,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Grid,
  Box,
  Checkbox,
  Link,
  TextField,
  Button,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(4, 'Minimum 4 characters').max(10, 'Maximum 10 characters').required('Password is required'),
  confirm: Yup.string().label('Confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  age: Yup.number().min(18, 'You must be over 18 years old').required('Age is required'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  
  const initialCredential = {
    email: '',
    password: '',
    name: '',
    confirm: '',
    age: 18,
  };

  const handleRegister = async (values: any) => {
    try {
      const response: AxiosResponse = await register(values.name, values.email, values.password, values.age);
      if (response.status === 200) {
        console.log(response.data);
        navigate('/')
      } else {
        throw new Error('Error server');
      }
    } catch (error) {
      console.error("[Register Error]: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register Form
        </Typography>

        <Formik
          initialValues={initialCredential}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    autoComplete="name"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                  />
                  <ErrorMessage name="email">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    id="confirm"
                    name="confirm"
                    label="Confirm Password"
                    type="password"
                  />
                  <ErrorMessage name="confirm">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    id="age"
                    name="age"
                    label="Age"
                    type="number"
                  />
                  <ErrorMessage name="age">
                    {(msg) => <FormHelperText error>{msg}</FormHelperText>}
                  </ErrorMessage>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I accept the terms and conditions."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              {isSubmitting ? <Typography>Sending data to registry...</Typography> : null}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default RegisterForm;
