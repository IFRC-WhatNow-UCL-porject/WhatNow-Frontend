import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Grid, Box, Divider } from '@mui/material';

import { get_society_and_region_name } from '../../store/features/messages.slice';

import { messageTypes, language_code } from '../../constant';

const PicGenerator = ({handleSetRef, content, message, index}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const innerRef = useRef(null);

  const [societyName, setSocietyName] = useState('');
  const [regionName, setRegionName] = useState('');

  React.useEffect(() => {

    handleSetRef(innerRef, index);

    if (content) {
      dispatch(get_society_and_region_name({ society_id: content.society_id, region_id: content.region_id })).then((response) => {
        const result = response.payload;
        if (result.status) {
          setSocietyName(result.data.society_name);
          setRegionName(result.data.region_name);
        }
      });
    }
  }, []);

  return (
    <div ref={innerRef} style={{ width: '600px', height: 'auto', position: 'absolute', left: '-9999px', top: '-9999px' }}>
      <Paper style={{ padding: '20px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            123
          </Grid>
          <Grid item>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              {content.title}
            </Typography>
            <Box style={{ backgroundColor: 'red', color: 'white', borderRadius: '20px', padding: '0 10px', fontWeight: 'bold' }}>
              {Object.keys(messageTypes)[index].replace('_', ' ')}
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Typography style={{ margin: '20px 0' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <span>{societyName}</span>
            <span>{language_code[content.language_code]}</span>
            <span>{regionName}</span>
          </Box>
        </Typography>
        <Divider sx={{ mb: 2, mt: 2 }} />
        <div>
          {message.map((item, index) => (
            <Typography key={index} style={{ textIndent: '20px', marginTop: '10px' }}>
              {index}. {item.content}
            </Typography>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default PicGenerator;
