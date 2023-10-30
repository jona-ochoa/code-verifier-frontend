import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';

import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/AuthService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const loginSchema = Yup.object().shape(
  {
    email: Yup.string().email('Invalid email Format').required('Email is required'),
    password: Yup.string().min(4, 'Minimo 3 character').max(10, 'Max 10 characters').required('Password is required')
  }
)

const LoginMateria = () => {

  const initialCredential = {
    email: '',
    password: ''
  }

  const navigate = useNavigate();

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, values) => {
  //   event.preventDefault()
  //   login(values.email, values.password).then(async (response: AxiosResponse) => {
  //     if (response.status === 200) {
  //         if (response.data.token) {
  //             await sessionStorage.setItem('sessionJWTToken', response.data.token)
  //             navigate('/');
  //         } else {
  //             throw new Error('Invalid token')
  //         }
  //     } else {
  //         throw new Error('Error server')
  //     }
  // }).catch((error) => {
  //     console.error("[Login Error]: ", error);
  // })
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>

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
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                      {errors.email && touched.email && (
                        <FormHelperText id="email">Error</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                      {errors.password && touched.password && (
                        <ErrorMessage name="password" component="div"></ErrorMessage>
                      )}
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
                  >
                    Sign Up
                  </Button>
                  {isSubmitting ? (<Typography>Checking credentials...</Typography>) : null}
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="#" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              )
            }

          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginMateria;
