import React from 'react';
import { Container } from '@mui/material';

import ApiHeader from '../../../Component/ApisStats/Header';
import ApiList from '../../../Component/ApisStats/ApiList';

import BreadNav from '../../../Component/BreadNav';

const ApisStats = ({isShowBread=false}) => {

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
      <BreadNav path={['Home', 'Audit Log']} isDisplay={isShowBread}/>
      <div style={{ marginTop: '16px' }}></div>
      <ApiHeader>
        <div style={{ marginTop: '16px' }}></div>
        <ApiList/>
      </ApiHeader>
    </Container>
  );
};

export default ApisStats;