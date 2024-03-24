import React from 'react';
import { Paper, Typography, Divider, Grid } from '@mui/material';

import KeyCard from './KeyCard';

const KeyGrid = ({apps}) => {

  const app_names = apps.map((app) => app.name)

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>{apps.length} apps</Typography>
      <Divider style={{ marginBottom: '20px' }} />
      
      <Grid container spacing={2}>
        {apps.length > 0
        ?
        apps.map((item, index) => (
          <Grid item xs={3} key={index}>
            <KeyCard title={item.name} description={item.description} reach={item.reach} detailText={item.uuid} names={app_names} />
          </Grid>
        ))
        :
        <></>}
      </Grid>
    </Paper>
  );
};

export default KeyGrid;

