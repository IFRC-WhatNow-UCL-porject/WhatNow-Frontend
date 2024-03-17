import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ text, onClick, style, shrink}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        ...style,
        backgroundColor: '#B22222', // button bg color
        color: 'white', // button text color
        boxShadow: 'none', // remove shadow
        borderRadius: 0, // remove border radius
        textDecoration: 'none', // default no underline
        width: shrink ? 100 : 170,
        height: shrink ? 50 : 70,
        transition: 'width 0.3s',
        fontSize: '1rem', // text size
        fontWeight: 'bold', // text weight
        padding: '7px 20px', // button padding
        paddingBottom: '5px', // adjust button padding
        // textTransform: 'none', // prevent text uppercase
        '&:hover': {
          backgroundColor: 'red', // keep bg color when hover
          textDecoration: 'underline', // underline when hover
          textDecorationThickness: '4px', // adjust underline thickness
          textUnderlineOffset: '5px' // adjust underline offset
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
