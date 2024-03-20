import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography, Paper, Divider, Box, Link } from '@mui/material';
import React from 'react';
import BreadNav from '../../../Component/BreadNav';

const SignUpDoc = () => {

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh' }} my={2} >
        <BreadNav
          path={
            [
              { path: '/', name: 'Home' },
              { path: '/sign_up_guide', name: 'Sign Up Guide' }
            ]
          } 
        />
        <div style={{ marginTop: '16px' }}></div>
        <Paper style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h2" sx={{fontWeight: 'bold' }}>Get Started</Typography>
            </div>
            <Divider style={{ marginBottom: '10px' }} />
            <Typography variant="h3" sx={{mt:5}}>Step 1 - Sign up</Typography>
            <Typography variant="h5" sx={{mt:4}}>
              To get started using data from the WhatNow API, firstly&nbsp;
              <Link href="/sign_up_guide" target="_blank" rel="noopener noreferrer">
                    SIGN UP
              </Link>
              &nbsp;to the WhatNow Portal.
            </Typography>
            <Typography variant="h5" sx={{mt:4}}>
              You can use your Google account, or an email address to create an account.
            </Typography>
            <Typography variant="h5" sx={{mt:4}}>
              If you already have an account, please&nbsp;
              <Link href="/sign_up_guide" target="_blank" rel="noopener noreferrer">
                    LOG IN
              </Link>.
            </Typography>
            <Divider style={{ marginTop: '30px', marginBottom: '10px' }} />
            <Typography variant="h3" sx={{mt:5}}>Step 2 - Create an app</Typography>
            <Typography variant="h5" sx={{mt:4}}>
              To use the API you must create an application in the WhatNow Portal. Tell us a little about what you're building.
            </Typography>
            <img src={process.env.PUBLIC_URL + '/example-build.png'} style={{ marginTop: '30px', marginBottom: '10px', height: 500 }}></img>
            <Typography variant="h3" sx={{mt:5}}>Step 3 - Get an API</Typography>
            <Typography variant="h5" sx={{mt:4}}>
              Once you've created an app, you can get an API key to start using the API.
            </Typography>
            <img src={process.env.PUBLIC_URL + '/example-api.png'} style={{ marginTop: '30px', marginBottom: '10px', height: 500 }}></img>
            <Typography variant="h5" sx={{mt:4, fontWeight:'bold', mb:3}}>Important: Be sure to store this as securely as possible and avoid sharing or otherwise exposing your API key within your own application.</Typography>
        </Paper>
    </Container>
  );
};

export default SignUpDoc;