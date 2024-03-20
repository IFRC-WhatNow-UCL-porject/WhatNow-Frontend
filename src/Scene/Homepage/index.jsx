import React from 'react';
import { Box, Typography, Grid, Paper, Tabs, Tab, Divider, styled, Container } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

import ArrowButton from '../../Component/ArrowButton';
import PageButton from '../../Component/PageButton';
import MessageCard from '../../Component/Preview/MessageCard';
import AlertCard from '../../Component/Preview/AlertCard';
import WhatnowCard from '../../Component/Preview/WhatnowCard';
import PlainSwitch from '../../Component/PlainSwitch';

import sample_data from './sample_data.json';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography variant='h3' sx={{ color: '#708090' }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const NoRippleTab = styled(Tab)({
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
});

const HomePage = () => {

  const tabs = [
    { icon: process.env.PUBLIC_URL + '/use_cases.svg', label: 'Use Cases', onClick: () => window.location.href = 'https://www.preparecenter.org/resources/whatnow-service-use-case-google-safety-tips' },
    { icon: process.env.PUBLIC_URL + '/implementation_toolkit.svg', label: 'Implementation Toolkit', onClick: () => window.location.href = 'https://www.preparecenter.org/toolkit/whatnow-service-toolkit' },
    { icon: process.env.PUBLIC_URL + '/whatnow_video.svg', label: 'WhatNow Video', onClick: () => window.location.href = 'https://www.youtube.com/watch?v=Tc0P1kX5xJA' },
    { icon: process.env.PUBLIC_URL + '/hands@2x.png', label: 'How it Works', onClick: () => window.location.href = 'https://www.preparecenter.org/activities/whatnow-service'}
  ];

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [isSwitched, setIsSwitched] = useState(false);

  const handleSwitchChange = (event) => {
    setIsSwitched(event.target.checked);
  };

  return (
  <Container maxWidth={false} sx={{ minHeight: '80vh', width: 1800 }}>
      <Helmet>
        <title>WhatNow Service</title>
      </Helmet>
      <Box my={2} sx={{ display: 'flex', backgroundImage: 'url(' + process.env.PUBLIC_URL + '/hurricane.png)', backgroundSize: 'cover', height: 400 }}>
        <Box sx={{ width: '50%', bgcolor: 'rgba(255, 0, 0, 0.4)', color: 'white', margin: '20px 0', padding: 2 }}>
          <Typography variant="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
            WhatNow Service
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
            Global Red Cross / Red Crescent Key Safety Messages
          </Typography>
          <Paper elevation={0} sx={{ borderRadius: 2, marginTop: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
              <NoRippleTab label="DEVELOPER" sx={{ fontWeight: 'bold' }} />
              <NoRippleTab label="NATIONAL SOCIETY" sx={{ fontWeight: 'bold' }} />
            </Tabs>
            <Divider />
            <TabPanel value={tabValue} index={0}>
              Help communities prepare, respond, and recover from hazards with our localized key action messages.
              <br />
              <br />
              Use our easy four-step guide to integrate the WhatNow messages into your application. Sign up and see all available messages.
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Publish your RCRC National Society's key safety messages for global, national, and local media to access and broadcast.
              <br />
              <br />
              Contact us to learn more about how to create the messages and connect with media partners.
            </TabPanel>
          </Paper>
        </Box>
        {/* empty of main post */}
        {/* <Box sx={{ width: '50%' }}>
        </Box> */}
      </Box>

      <Box mt={8}>
        <Typography variant="h2" sx={{ textAlign: 'center', my: 2, fontWeight: 'bold' }}>
          Click Here To Learn More
        </Typography>
        <Grid container spacing={2} my={2} justifyContent="center">
          {tabs.map((tab, index) => (
            <Grid item xs={3} key={index}>
              <Paper
                elevation={0}
                sx={{ padding: 2, textAlign: 'center', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
                onClick={tab.onClick}
              >
                <img src={tab.icon} alt="icon" style={{ width: '100px', height: '100px' }} />
                <Typography variant="h3" sx={{ fontWeight: 'bold', marginTop: '10px' }}>{tab.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={8}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#ED1B2E',
          height: 200,
          mt: 2,
          position: 'relative'
        }}>
          <img src={process.env.PUBLIC_URL + '/get-started-left@3x.png'} alt="Icon 1" style={{ position: 'absolute', left: 0, bottom: 0, width: '240px', height: '180px' }} />
          <img src={process.env.PUBLIC_URL + '/get-started-right@3x.png'} alt="Icon 2" style={{ position: 'absolute', right: 0, top: 0, width: '240px', height: '180px' }} />
          <Typography variant="h2" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Ready to build your app?
          </Typography>
          <ArrowButton text={'CLICK HERE TO SIGN UP'} style={{ fontWeight: 'bold', fontSize: '20px' }} event={() => window.location.href = '/register'} />
        </Box>
      </Box>

      <Box my={8}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, alignItems: 'center', fontWeight: 'bold'}}>
            Sample WhatNow Message Format
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography 
              sx={{ fontWeight: isSwitched ? '' : 'bold', color: isSwitched ? 'grey' : 'red' }}
          >
              WHATNOW PREVIEW
          </Typography>
          <PlainSwitch checked={isSwitched} onChange={handleSwitchChange} />
          <Typography 
              sx={{ fontWeight: isSwitched ? 'bold' : '', color: isSwitched ? 'red' : 'grey' }}
          >
              ALERT PREVIEW
          </Typography>
        </Box>

        <Grid container spacing={1} my={2}>
          <Grid item xs={6}>
            <MessageCard data={isSwitched ? sample_data[0].data : sample_data[1].data} />
          </Grid>
          <Grid item xs={6}>
            {isSwitched ? <AlertCard data={sample_data[0].data} /> : <WhatnowCard data={sample_data[1].data} />}
          </Grid>
        </Grid>
      </Box>

      <Box mt={8}>
        <Box
          sx={{
            backgroundColor: '#1E1E1E',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            position: 'relative'
          }}
        >
          <Typography variant="h1" sx={{ color: 'white', fontWeight: 'bold', marginTop: 10}} >WhatNow Messages</Typography>
          <Typography variant="h4" sx={{ color: 'white', marginTop: 2}} >Sign up and view the key action messages from Red Cross / Red Crescent National Societies around the world</Typography>
          <img src={process.env.PUBLIC_URL + '/data-preview.png'} alt="data-preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          <PageButton
            event={() => window.location.href = '/whatnow_messages'}
            text='view whatnow messages'
            style={{ 
                position: 'absolute',
                transform: 'translateY(-160%)'  // move up
              }}/>
        </Box>
      </Box>
  </Container>
  );
};

export default HomePage;
