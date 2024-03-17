import React from 'react';
import { Paper, Typography } from '@mui/material';

import card_info_generator from './card_generator';

const CustomPaper = ({ data }) => {

  const card_info = card_info_generator('alert', data);

  return (
    <Paper sx={{ padding: 2, position: 'relative', height: '300px' }}>
      <img src={process.env.PUBLIC_URL + 'cold@3x.png'} alt="Icon" style={{ position: 'absolute', top: 16, left: 16, width: '70px', height: '70px' }} />
      <Typography variant="h2" style={{ position: 'absolute', left: 100, top: 30 }}>
        {card_info.event_name}
      </Typography>
      <Typography sx={{ fontSize: '17px', color: '#808080', position: 'absolute', top: 110 }}>
        {card_info.content}
      </Typography>
    </Paper>
  );
};

export default CustomPaper;
