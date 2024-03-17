import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, Container, Box } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { send_reset_password_email } from '../../store/features/auth.slice';

const ChangePasswordPaper = () => {

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
      if (validateEmail(event.target.value)) {
          setEmailError(false);
      } else {
          setEmailError(true);
      }
      setEmail(event.target.value);
  };

    const handleSubmit = () => {
        dispatch(send_reset_password_email({ email: email })).then((response) => {
            const result = response.payload;
            if (result.status) {
                localStorage.setItem('success', "Reset email has been sent to your email address.");
                window.location.reload();
            } else {
                localStorage.setItem('fail', "Email not found.");
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
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>EMAIL</Typography>
                        <TextField
                            value={email}
                            onChange={handleEmailChange}
                            margin="normal"
                            fullWidth
                            error={emailError}
                        />
                        <FormHelperText style={{ fontSize: '1rem', color: emailError ? 'red' : 'inherit' }}>
                            {emailError ? 'incorrect email format, example: example@domain.com' : ''}
                        </FormHelperText>

                        <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 1 }}>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" color='secondary' disabled={emailError && (email == '')} onClick={() => handleSubmit() }>Get Reset Email</Button>
                            </Grid>
                        </Grid>
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

export default ChangePasswordPaper;
