import { Container } from '@mui/material';
import React from 'react';

import ManageHeader from '../../../Component/Manage/Header';

import UserList from '../../../Component/Manage/UserList';

const ManageUsers = () => {

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
        <div style={{ marginTop: '16px' }}></div>
        <ManageHeader>
          <div style={{ marginTop: '16px' }}></div>
            <UserList />
        </ManageHeader>
    </Container>
  );
};

export default ManageUsers;