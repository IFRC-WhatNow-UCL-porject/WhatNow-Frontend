import { Container } from '@mui/material';
import React from 'react';

import ManageHeader from '../../../Component/Manage/Header';

import UserList from '../../../Component/Manage/UserList';

import BreadNav from '../../../Component/BreadNav';

const ManageUsers = () => {

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
        <BreadNav
          path={
            [
              { path: '/', name: 'Home' },
              { path: '/gdpc_admin/manage_users', name: 'Manage Users' }
            ]
          }
        />
        <div style={{ marginTop: '16px' }}></div>
        <ManageHeader>
          <div style={{ marginTop: '16px' }}></div>
            <UserList />
        </ManageHeader>
    </Container>
  );
};

export default ManageUsers;