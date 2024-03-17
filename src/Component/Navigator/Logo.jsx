import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ src, shrink }) => {

  return (
    <Box
      component="img"
      src={src}
      alt="Logo"
      sx={{
        width: shrink ? 150 : 200,
        height: 'auto',
        transition: 'width 0.3s', // smooth transition
        '&:hover': {
          opacity: 0.7,
        }
      }}
      onClick={() => window.location.href = '/'}
    />
  );
};

export default Logo;
