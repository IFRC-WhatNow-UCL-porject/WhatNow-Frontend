import React, { useState } from 'react';
import { Button, CircularProgress, styled } from '@mui/material';

const StyledButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: 'red',
  },
});

const LoadingButton = ({ text, clickEvent }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    clickEvent().then(() => {
      setLoading(false);
    }).catch(() => {
      console.log('Error');
      setLoading(false);
    });
  };

  return (
    <StyledButton
      variant="contained"
      onClick={handleClick}
      startIcon={loading ? <CircularProgress color="inherit" size={20} /> : null}
      disabled={loading}
    >
      {loading ? 'Loading...' : text}
    </StyledButton>
  );
};

export default LoadingButton;
