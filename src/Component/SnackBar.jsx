import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const CustomSnackbar = () => {
  const [open, setOpen] = useState(false);

  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  React.useEffect(() => {
    if (localStorage.getItem('success')) {
        setText(localStorage.getItem('success'));
        setIsSuccess(true);
        setOpen(true);
        localStorage.removeItem('success');   
    } else if (localStorage.getItem('fail')) {
        setText(localStorage.getItem('fail'));
        setIsSuccess(false);
        setOpen(true);
        localStorage.removeItem('fail');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000); // 5秒后关闭 Snackbar

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={() => setOpen(false)}
      message={
        <span style={{ display: 'flex', alignItems: 'center', color: 'white', fontWeight: 'bold' }}>
          {isSuccess ? <CheckCircleIcon style={{ marginRight: '8px' }} /> : <CloseIcon style={{ marginRight: '8px' }} /> }
          {text}
        </span>
      }
      ContentProps={{
        sx: {
          backgroundColor: isSuccess ? '#4caf50' : '#f44336',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          borderRadius: '10px',
          padding: '10px 20px',
        }
      }}
    /> 
  );
};

export default CustomSnackbar;
