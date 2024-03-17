import React, { useState } from 'react';
import { Button } from '@mui/material';

const CustomMenu = ({ handleMouseEnter, handleMouseLeave, hover, style, text }) => {

  return (
    <div>
      <Button
        disableRipple
        aria-controls="customized-menu"
        aria-haspopup="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          ...style,
          color: 'black',
          fontSize: '1.3rem', // text size
          fontWeight: 'bold', // text weight
          textDecoration: hover ? 'underline red solid' : 'none',
          textDecorationThickness: '4px',
          textUnderlineOffset: '5px',
          textTransform: 'none', // text transform
          '&:hover': {
            textDecoration: 'underline',
            textDecorationColor: 'red',
            textDecorationThickness: '4px', // adjust underline thickness
            textUnderlineOffset: '5px' // adjust underline offset
          },
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default CustomMenu;

