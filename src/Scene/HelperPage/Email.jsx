import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { check_email_token } from '../../store/features/auth.slice';

import tokenTypes from '../../tokens';

const Token = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const tokenAct = queryParams.get('tokenAct');
  const tokenPass = queryParams.get('tokenPass');

    React.useEffect(() => {
        if (!tokenAct && !tokenPass) {
            navigate('/');
        }
        if (tokenAct) {
            dispatch(check_email_token({ token: tokenAct, type: tokenTypes.VERIFY_EMAIL })).then((response) => {
                const result = response.payload;
                if (result.status) {
                    navigate('/login');
                } else {
                    localStorage.setItem('error', "Token is invalid or expired");
                    window.location.href = '/';
                }
            });
        } else if (tokenPass) {
            dispatch(check_email_token({ token: tokenPass, type: tokenTypes.RESET_PASSWORD })).then((response) => {
                const result = response.payload;
                if (result.status) {
                    navigate('/reset_password');
                } else {
                    localStorage.setItem('error', "Token is invalid or expired");
                    window.location.href = '/';
                }
            });
        }
    }, [tokenAct, tokenPass]);

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h3" gutterBottom>
          VERIFYING
        </Typography>
        <Typography variant="subtitle1">
          Please wait while we verify your token
        </Typography>
      </Container>
    </Container>
  );
};

export default Token;
