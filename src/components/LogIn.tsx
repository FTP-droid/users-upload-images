import { useState } from 'react';
import { Link as RouteLink} from 'react-router-dom';

import {createUserWithEmailAndPassword } from "firebase/auth";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { auth } from '../Firebase'

const theme = createTheme();

export default function LogIn({isSignUpPage}: {isSignUpPage: boolean}) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            {isSignUpPage? "Sign Up" : "Log in"}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
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
              </Grid>
              {isSignUpPage && <Grid item xs={12}> 
                <Button
                  variant="contained"
                  component="label"
                >
                    Upload Image
                    <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="image"
                    id="image"
                />
                </Button>
              </Grid>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUpPage? "Sign Up": "Sign In"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouteLink to={isSignUpPage? "/": "/signup"}>
                    {isSignUpPage? "Already have an account? Sign in": "Don't have an account? Sign up"}
                </RouteLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
