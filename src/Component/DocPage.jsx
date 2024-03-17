import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const TextImageMixComponent = ({ title, text }) => {

    // const text = [
    //     { type: 'text', value: 'eg' },
    //     { type: 'image', value: 'https://via.placeholder.com/150' },
    //     { type: 'text', value: 'eg' },
    //     { type: 'image', value: 'https://via.placeholder.com/150' },
    // ];

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h1" align="center" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      {text.map((item, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          {item.type === 'text' && (
            <Typography>{item.value}</Typography>
          )}
          {item.type === 'image' && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={item.value} alt={`pic ${index}`} style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
          )}
        </Box>
      ))}
    </Paper>
  );
};

export default TextImageMixComponent;
