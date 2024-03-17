import React from 'react';
import Button from '@mui/material/Button';

const HoverButton = ({ text, style, event }) => {
  return (
    <Button
    onClick={() => event()}
    sx={{
      ...style,
      backgroundColor: 'red',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      transition: 'color 500ms ease-in-out',
      border: '2px solid red',
      fontSize: '20px',
      fontWeight: 'bold',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: '200%',
        backgroundColor: 'white',
        transform: 'translateY(-50%) scaleY(0)',
        transition: 'transform 500ms ease-in-out',
        zIndex: 0,
      },
      '&:hover': {
        color: 'red',
        backgroundColor: 'red'
      },
      '&:hover:before': {
        transform: 'translateY(-50%) scaleY(1)',
      },
      '& > span': {
        position: 'relative',
        zIndex: 1,
      }
    }}>
      <span>{text}</span>
    </Button>
  );
};

export default HoverButton;
