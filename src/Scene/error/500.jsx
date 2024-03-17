import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InternalServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        500 - INTERNAL SERVER ERROR
      </Typography>
      <Typography variant="subtitle1">
        Sorry, the server encountered an error.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        onClick={() => navigate('/')}
      >
        Back to home page
      </Button>
    </Container>
  );
};

export default InternalServerErrorPage;
