import React from 'react';
import { Paper, Typography } from '@mui/material';

import card_info_generator from './card_generator';

const CustomPaper = ({ data }) => {

  const card_info = card_info_generator('whatnow', data);

  return (
    <Paper sx={{ padding: 2, position: 'relative', height: '300px', borderRight: '12px solid orange' }}>
      <img src={process.env.PUBLIC_URL + 'cold@3x.png'} alt="Icon" style={{ position: 'absolute', top: 16, left: 16, width: '70px', height: '70px' }} />
      <Typography variant="h2" style={{ position: 'absolute', left: 110, top: 20 }}>
        {card_info.event_name}
      </Typography>
      <Typography variant="h5" style={{ color: '#808080', position: 'absolute', left: 110, top: 60 }}>
        {card_info.subtitle}
      </Typography>
      <Typography variant="h5" style={{ color: '#000000', position: 'absolute', left: 30, top: 100 }}>
        {card_info.description}
      </Typography>
      <Typography variant="h5" style={{ fontWeight: 'bold', color: '#808080', position: 'absolute', left: 50, top: 160 }}>
        WHATNOW
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, color: '#808080', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', position: 'absolute', top: 160, left: 70 }}>
        {card_info.content.mitigation.map((item, index) => (
            <div>
                {item}
                <br />
            </div>
        ))}
      </Typography>
      <Typography variant="h6" style={{ textDecoration: 'underline', color: '#808080', position: 'absolute', left: 425, top: 13 }}>
        {card_info.society}
      </Typography>
      <Typography variant="h6" style={{ textDecoration: 'underline', color: '#808080', position: 'absolute', left: 410, top: 30 }}>
        {card_info.url}
      </Typography>
    </Paper>
  );
};

export default CustomPaper;
