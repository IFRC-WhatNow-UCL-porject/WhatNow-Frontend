import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import UserInfo from '../../../Component/ModifyProfile/UserInfo';
import Header from '../../../Component/ModifyProfile/Header';
import Usage from '../../../Component/ModifyProfile/Usage';
import SocietyList from '../../../Component/ModifyProfile/Society';

import BreadNav from '../../../Component/BreadNav';

import { getUserInfo } from '../../../store/features/profile.slice';

const ModifyProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const user_id = queryParams.get('uuid');

  const [user, setUser] = useState({});

  React.useEffect(() => {
    try {
      dispatch(getUserInfo({ uuid: user_id })).then((response) => {
        const result = response.payload;
        if (result.status) {
          setUser(result.data);
        }
      })
    } catch (error) {
      console.log('Error:', error)
    }
  }, [navigate]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh' }} my={2} >
      <BreadNav path={['Home', 'My Profile']} />
      <div style={{ marginTop: '16px' }}></div>
      <Header user_id={user_id}>
        <div style={{ marginTop: '16px' }}></div>
        <UserInfo userData={user} />
        <div style={{ marginTop: '16px' }}></div>
      </Header>
      <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Usage user_id={user_id} email={user.email} status={user.status} usage={user.usage} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SocietyList user_id={user_id}/>
          </Grid>
      </Grid>
      <div style={{ marginTop: '16px' }}></div>
    </Container>
  );
};

export default ModifyProfile;