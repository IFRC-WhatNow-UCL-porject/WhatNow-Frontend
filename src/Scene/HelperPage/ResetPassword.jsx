import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, InputAdornment, IconButton, Container, Box, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { reset_password } from '../../store/features/auth.slice';

const ChangePasswordPaper = () => {

    const validatePassword = (password) => {
        return password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
        );
    };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  React.useEffect(() => {
    if (!token) {
        navigate('/');
    }
  }, [token]);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isLogDisabled, setIsLogDisabled] = useState(true);

    const handlePasswordChange = (event) => {
        if (validatePassword(event.target.value)) {
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false);
        }
        if (value.length >= 12 && value === password) {
            setIsLogDisabled(false);
        } else {
            setIsLogDisabled(true);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        dispatch(reset_password({ password: password, token: token })).then((response) => {
            const result = response.payload;
            if (result.status) {
                localStorage.setItem('success', "Password has been reset successfully!");
                navigate('/login');
            }
        });
    };

  return (
    <Container maxWidth={false} sx={{ minHeight: '80vh', width: 1500, paddingTop: 3 }}>
        <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} padding={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ width: '80%', maxWidth: 400, mx: 'auto' }}>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>PASSWORD</Typography>
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            margin="normal"
                            fullWidth
                            error={passwordError}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            )
                            }}
                        />
                        <FormHelperText style={{ fontSize: '1rem', color: passwordError ? 'red' : 'inherit' }}>
                            {passwordError ? 'incoreect password: at least 12 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character' : ''}
                        </FormHelperText>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>CONFIRMED PASSWORD</Typography>
                        <TextField
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            margin="normal"
                            fullWidth
                            error={confirmPasswordError}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownConfirmPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            )
                            }}
                        />
                        <FormHelperText style={{ fontSize: '1rem', color: confirmPasswordError ? 'red' : 'inherit' }}>
                            {confirmPasswordError ? 'confirmed password should be same as above' : ''}
                        </FormHelperText>

                        <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 1 }}>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" color='secondary' disabled={isLogDisabled} onClick={() => handleLogin() }>Confirm</Button>
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
