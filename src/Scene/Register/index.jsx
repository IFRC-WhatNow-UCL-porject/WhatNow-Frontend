import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Paper, Typography, Box, TextField, FormControl, Select, MenuItem, IconButton, InputAdornment, Button, FormHelperText, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { userRoles, industry_type } from '../../constant';

import { googleCheckEmail, addApiUser, register } from '../../store/features/auth.slice';

import { send_activation_email } from '../../store/features/auth.slice';

import countryCode from '../../countryCode';

const LoginComponent = () => {

    const dispatch = useDispatch();

    const [activeButton, setActiveButton] = useState('developer');

    const handleButtonClick = (buttonType) => {
      setActiveButton(buttonType);
    };

    const successGoogleLogin = (response) => {
        const decoded = jwt_decode(response.credential);
        const email = decoded.email;
        dispatch(googleCheckEmail({ email: email })).then((response) => {
            const result = response.payload;
            if (result.status) {
                if (result.data.exist) {
                    window.location.href = '/login';
                } else {
                    dispatch(register({ email: email, password: Math.random().toString(), user_role: userRoles.API_USER })).then((response) => {
                        const result = response.payload;
                        if (result.status) {
                            dispatch(send_activation_email({ email: email })).then((response) => {
                                const result = response.payload;
                                if (result.status) {
                                    localStorage.setItem('success', "Please check your email to activate your account");
                                    window.location.href = '/login';
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    // input

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validatePassword = (password) => {
        return password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
        );
    };

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const handlePasswordChange = (event) => {
        if (validatePassword(event.target.value)) {
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
        setPassword(event.target.value);
    };
  
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleConfirmPasswordChange = (event) => {
        if (event.target.value === password) {
            setConfirmPasswordError(false);
        } else {
            setConfirmPasswordError(true);
        }
        setConfirmPassword(event.target.value);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [location, setLocation] = useState('');
    const [organization, setOrganization] = useState('');
    const [industryType, setIndustryType] = useState('');
    const [email, setEmail] = useState('');
    const [usage, setUsage] = useState('');

    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (event) => {
        if (validateEmail(event.target.value)) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
        setEmail(event.target.value);
    };

    const handleRegister = () => {
        dispatch(addApiUser({
            first_name: firstname,
            last_name: lastname,
            location: location,
            organization: organization,
            industry_type: industryType,
            email: email,
            usage: usage,
            password: password
        })).then((response) => {
            const result = response.payload;
            if (result.status) {
                dispatch(send_activation_email({ email: email })).then((response) => {
                    const result = response.payload;
                    if (result.status) {
                        localStorage.setItem('success', "Please check your email to activate your account");
                        window.location.href = '/login';
                    }
                });
            }
        });
    }

  return (
    <Container maxWidth={false} sx={{ minHeight: '80vh', width: 1500, paddingTop: 3 }}>
        <Paper sx={{ padding: 2 }}>
            <Typography variant="h2" align="center" sx={{ fontWeight: 'bold', mt: 2, mb: 2 }} >Create your free WhatNow Service account</Typography>

            <Box bgcolor="#D3D3D3" borderRadius="10px" padding="20px" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                <Box bgcolor="white" borderRadius="10px" padding="10px" textAlign="center">
                    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}>WHO ARE YOU?</Typography>
                    <Box display="flex" justifyContent="center" marginBottom="10px">
                        <Button
                            variant={activeButton === 'developer' ? 'contained' : 'outlined'}
                            color="secondary"
                            onClick={() => handleButtonClick('developer')}
                            style={{ marginRight: '10px', fontWeight: 'bold' }}
                        >
                            DEVELOPER
                        </Button>
                        <Button
                            variant={activeButton === 'ns' ? 'contained' : 'outlined'}
                            color="secondary"
                            onClick={() => handleButtonClick('ns')}
                            style={{ marginLeft: '10px', fontWeight: 'bold' }}
                        >
                            NATIONAL SOCIETY
                        </Button>
                    </Box>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}>OR</Typography>
                    <Box sx={{ml:14, mb: 2}}>
                        <GoogleLogin
                            buttonText="Login with Google"
                            onSuccess={successGoogleLogin}
                            onFailure={() => {
                                console.log('failure');
                            }}
                        />
                    </Box>
                </Box>

                {activeButton === 'developer' ?
                    <Box bgcolor="white" borderRadius="10px" padding="10px" textAlign="center" sx={{mt:2}}>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>FIRST NAME</Typography>
                        <TextField value={firstname} onChange={(e) => setFirstname(e.target.value)} margin="normal" fullWidth/>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>LAST NAME</Typography>
                        <TextField value={lastname} onChange={(e) => setLastname(e.target.value)} margin="normal" fullWidth/>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>LOCATION</Typography>
                        <FormControl fullWidth margin="normal">
                            <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                                {countryCode.map((country, index) => (
                                    <MenuItem key={index} value={country[0]}>{country[1]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>ORGANIZATION</Typography>
                        <TextField value={organization} onChange={(e) => setOrganization(e.target.value)} margin="normal" fullWidth/>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>INDUSTRY TYPE</Typography>
                        <FormControl fullWidth margin="normal">
                            <Select value={industryType} onChange={(e) => setIndustryType(e.target.value)}>
                                {Object.keys(industry_type).map((type, index) => (
                                    <MenuItem key={index} value={type}>{industry_type[type]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>EMAIL</Typography>
                        <TextField
                            value={email}
                            onChange={handleEmailChange}
                            margin="normal"
                            fullWidth
                            error={emailError}
                        />
                        <FormHelperText style={{ fontSize: '1rem', color: emailError ? 'red' : 'inherit' }}>
                            {emailError ? 'incorrect email format, example: test@test.com' : ''}
                        </FormHelperText>
                        <Typography variant="h5" align="left" sx={{mt:3, fontWeight: 'bold'}}>WHERE WILL THIS API BE USED?</Typography>
                        <TextField
                            multiline
                            value={usage}
                            onChange={(e) => setUsage(e.target.value)}
                            margin="normal"
                            fullWidth
                            rows={4}
                        />
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
                            {confirmPasswordError ? 'incoreect confirmed password, should be same with above' : ''}
                        </FormHelperText>
                        <Typography variant="h5" sx={{mt:5}}>
                            By creating your account, you agree to our&nbsp;
                            <Link href="/terms_and_conditions" target="_blank" rel="noopener noreferrer">
                                Terms and Conditions
                            </Link>.
                            </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ fontWeight: 'bold', marginTop: '20px', marginBottom: '20px' }}
                            fullWidth
                            onClick={() => handleRegister()}
                            disabled={passwordError || confirmPasswordError || emailError || !firstname || !lastname || !location || !organization || !industryType || !email || !usage || !password || !confirmPassword}
                        >
                            SIGN UP
                        </Button>
                    </Box>
                    :
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ height: '400px' }}
                    >
                        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mt: 10, mb: 3 }}>To sign up, please contact the WhatNow Service team at the Global Disaster Preparedness Center at gdpc@redcross.org</Typography>
                        <Button
                            onClick={() => window.location.href = 'mailto:gdpc@redcross.org'}
                            variant='contained'
                            color="primary"
                            style={{ fontWeight: 'bold' }}
                            sx={{ mb: 10 }}
                        >
                            CONTACT GDPC
                        </Button>
                    </Box>
                }
            </Box>
        </Paper>
    </Container>
  );
};

export default LoginComponent;
