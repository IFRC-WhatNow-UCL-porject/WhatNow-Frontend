import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, InputAdornment, IconButton, Container, Box, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkLogInfo, login, googleCheckEmail } from '../../store/features/auth.slice';

const LoginPaper = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showWrongMessage, setShowWrongMeaaage] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogDisabled, setIsLogDisabled] = useState(true);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const inputLabelStyle = { fontSize: '1rem' };
  const helperTextStyle = { fontSize: '0.8rem' };

  const handlePasswordChange = (event) => {
    setShowWrongMeaaage(false);
    setPassword(event.target.value);
    if (event.target.value.trim() === '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleEmailChange = (event) => {
    setShowWrongMeaaage(false);
    setEmail(event.target.value);
    if (event.target.value.trim() === '') {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (email.trim() === '') {
      setEmailError(true);
    }
    if (password.trim() === '') {
      setPasswordError(true);
    }
    if (email.trim() !== '' && password.trim() !== '') {
        try {
            dispatch(checkLogInfo({ email, password })).then((response) => {
              if (response.payload.status) {
                  dispatch(login({ email, password })).then((response) => {
                    const result = response.payload;
                      if (result.status) {
                          localStorage.setItem('access_token', result.tokens.token);
                          localStorage.setItem('user', JSON.stringify(result.data));
                          navigate('/');
                      }
                  });
              } else {
                  setShowWrongMeaaage(true);
              }
            });
        } catch (error) {
            console.log(error);
        }
    }
  };

  React.useEffect(() => {
    if (email && password) {
      setIsLogDisabled(false);
    } else {
      setIsLogDisabled(true);
    }
  }, [email, password]);

  const successGoogleLogin = (response) => {
    const token = response.credential;
    const decoded = jwt_decode(token);
    const email = decoded.email;
    dispatch(googleCheckEmail({ email: email })).then((response) => {
      const result = response.payload;
      if (result.status) {
          if (result.data.exist) {
              localStorage.setItem('user', JSON.stringify(result.data.data));
              localStorage.setItem('access_token', result.data.tokens.token);
              window.location.href = '/';
          } else {
              localStorage.setItem('fail', "please register first");
              window.location.href = '/register';
          }
      } else {
        localStorage.setItem('fail', "Please verify your email first. If verified, please contact GDPC admin.");
        window.location.reload();
      }
    });
  };

  return (
    <Container maxWidth={false} sx={{ minHeight: '80vh', width: 1500, paddingTop: 3 }}>
        <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} padding={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ width: '80%', maxWidth: 400, mx: 'auto' }}>
                        <Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }} >Welcome Back!</Typography>
                        {showWrongMessage ? <Typography variant="h6" align="center" sx={{ color: 'red', marginTop: 1 }}>These credentials do not match our records</Typography> : ''}
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                            helperText={emailError ? 'Email Required' : ''}
                            InputLabelProps={{ style: inputLabelStyle }}
                            FormHelperTextProps={{ style: helperTextStyle }}
                        />

                        <TextField
                            label="Password"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                            error={passwordError}
                            helperText={passwordError ? 'Password Required' : ''}
                            InputLabelProps={{ style: inputLabelStyle }}
                            FormHelperTextProps={{ style: helperTextStyle }}
                        />

                        <Box sx={{ml:10.5, mb: 1, mt: 1}}>
                          <GoogleLogin
                              buttonText="Login with Google"
                              onSuccess={successGoogleLogin}
                              onFailure={() => {
                                  console.log('failure');
                              }}
                          />
                        </Box>

                        <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 1 }}>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" color='secondary' disabled={isLogDisabled} onClick={() => handleLogin() }>Log in</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" color='primary' onClick={() => navigate("/forget_password")}>Forget Password</Button>
                            </Grid>
                        </Grid>

                        <Typography align="center" sx={{ marginBottom: 2 }}>
                            Don't have an account? <Link onClick={() => window.location.href='/register'} sx={{ userSelect: 'none', cursor: 'pointer' }}>Sign up</Link>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                <img src={process.env.PUBLIC_URL + "/illustration.png"} alt="登录图片" style={{ width: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Paper>
    </Container>
  );
};

export default LoginPaper;
