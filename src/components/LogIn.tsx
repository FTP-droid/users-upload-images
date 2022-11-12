import { useState } from 'react';
import { Link as RouteLink, useNavigate} from 'react-router-dom';

import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
const IMAGE_REGEX = /[\/.](gif|jpg|jpeg|tiff|png)$/i;

export default function LogIn({isSignUpPage}: {isSignUpPage: boolean}) {

  const navigate = useNavigate();

  const [isFileInputValid, setIsFileInputValid] = useState(true);
  const [errorFromFirebase, setErrorFromFirebase] = useState("");

  const handleSubmit = isSignUpPage? (event: React.FormEvent<HTMLFormElement>) => {
    setErrorFromFirebase("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const image = data.get('image');


    if(image == null){
      setIsFileInputValid(false);
      return
    }

    if(image instanceof File){
      setIsFileInputValid(IMAGE_REGEX.test(image.name));
      if(!isFileInputValid) return;
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setErrorFromFirebase(error.message);
      })
  } 
    : 
  (event: React.FormEvent<HTMLFormElement>) => {
    setErrorFromFirebase("");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const username = userCredential.user.email;
      console.log(username);
      navigate('/user', {state:{username: username}});  
    })
    .catch((error) => {
      setErrorFromFirebase(error.message);
      console.log(error.message);
    });
  }

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
              {isSignUpPage && (
                <Grid item xs={12}> 
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
                </Grid>
              )}
              {
                errorFromFirebase && 
                  <Grid item xs={12}> 
                    {errorFromFirebase}
                  </Grid>
              }

              {isSignUpPage && (
                !isFileInputValid && 
                  <Grid item xs={12}> 
                    Invalid Image Upload
                  </Grid>
              )}
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
