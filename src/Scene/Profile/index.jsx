import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from '@mui/material';

import UserInfo from '../../Component/Profile/UserInfo';
import Header from '../../Component/Profile/Header';
import Password from '../../Component/Profile/Password';
import SocietyList from '../../Component/Profile/Society';

import BreadNav from '../../Component/BreadNav';

import { getUserInfo } from '../../store/features/profile.slice';

const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  React.useEffect(() => {
    try {
      dispatch(getUserInfo({ uuid: JSON.parse(localStorage.getItem("user")).uuid })).then((response) => {
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
        <BreadNav
          path={
            [
              { path: '/', name: 'Home' },
              { path: '/profile', name: 'Profile' }
            ]
          } 
        />
        <div style={{ marginTop: '16px' }}></div>
        <Header>
          <div style={{ marginTop: '16px' }}></div>
          <UserInfo userData={user} />
          <div style={{ marginTop: '16px' }}></div>
        </Header>
        <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={6}>
                <Password/>
            </Grid>
            <Grid item xs={12} md={6}>
                <SocietyList />
            </Grid>
        </Grid>
        <div style={{ marginTop: '16px' }}></div>
    </Container>
  );
};

export default Profile;