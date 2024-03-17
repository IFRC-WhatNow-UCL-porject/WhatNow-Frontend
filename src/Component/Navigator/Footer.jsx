import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

const Footer = () => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, backgroundColor: 'white', paddingBottom: 10, paddingLeft: 5, paddingRight: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
            component="img"
            src={process.env.PUBLIC_URL + '/footer-logo@3x.png'}
            alt="Logo"
            sx={{
                width: 300,
                height: 'auto',
            }}
        />
        <Typography variant='h3' sx={{ cursor: 'pointer', marginTop: 5 }} onClick={() => window.location.href = '/terms_and_conditions'}>Terms of Service</Typography>
        <Typography variant='h3' sx={{ cursor: 'pointer', marginTop: 5 }} onClick={() => window.location.href = 'https://www.preparecenter.org/content/privacy-policy'}>Privacy</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography variant='h3' sx={{ cursor: 'pointer', marginRight: 10 }}>Get Started</Typography>
        <Typography variant='h3' sx={{ cursor: 'pointer', marginRight: 10 }}>Documentation</Typography>
        <Typography variant='h3' sx={{ cursor: 'pointer', marginRight: 10 }} onClick={() => window.location.href = 'https://docs.google.com/forms/d/1ZgPYoInWaKbMrbhKBb2daPAbxXPq1NrHVNy7O3MAceU/'}>Feedback</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
