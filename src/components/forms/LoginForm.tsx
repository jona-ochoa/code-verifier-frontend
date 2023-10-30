import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/AuthService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(4, 'Minimum 4 characters').max(10, 'Maximum 10 characters').required('Password is required'),
});

const LoginForm = () => {
  const initialCredential = {
    email: '',
    password: '',
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setIsSubmitting(true); // Comenzar el proceso de inicio de sesión

    try {
      const response = await login(values.email, values.password);
      if (response.status === 200 && response.data.token) {
        sessionStorage.setItem('sessionJWTToken', response.data.token);
        navigate('/');
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error("[Login Error]: ", error);
    } finally {
      setIsSubmitting(false); // Finalizar el proceso de inicio de sesión
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
          Login Form
        </Typography>

        <Formik
          initialValues={initialCredential}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ touched, errors }) => (
            <Form>
              <Grid container spacing={2}>
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
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Remember me."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Login"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    Don't have an account? Register
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

export default LoginForm;
