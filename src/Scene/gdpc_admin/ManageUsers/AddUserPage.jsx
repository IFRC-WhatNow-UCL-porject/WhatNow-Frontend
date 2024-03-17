import React from 'react';
import { Container, Grid } from '@mui/material';

import UserInfo from '../../../Component/AddProfile/UserInfo';
import Header from '../../../Component/AddProfile/Header';
import Permission from '../../../Component/AddProfile/Permission';
import SocietyList from '../../../Component/AddProfile/Society';

import BreadNav from '../../../Component/BreadNav';

const AddProfile = () => {

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh' }} my={2} >
        <BreadNav path={['Home', 'My Profile']} />
        <div style={{ marginTop: '16px' }}></div>
        <Header>
          <div style={{ marginTop: '16px' }}></div>
          <UserInfo />
          <div style={{ marginTop: '16px' }}></div>
        </Header>
        <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={6}>
                <Permission/>
            </Grid>
            <Grid item xs={12} md={6}>
                <SocietyList/>
            </Grid>
        </Grid>
        <div style={{ marginTop: '16px' }}></div>
    </Container>
  );
};

export default AddProfile;