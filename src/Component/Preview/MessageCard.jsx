import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CustomCard = ({ data }) => {

  const formatted = JSON.stringify(data, null, 2)

  return (
    <Card sx={{ maxWidth: 700, borderRadius: '16px', borderLeft: '6px solid #228B22', position: 'relative', mb: 2, height: '300px'}}>
      <CardContent sx={{ overflow: 'auto', height: '100%' }}>
        <pre>
          {formatted}
        </pre>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
