import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { messageTypes } from '../../constant';

import { Paper, Grid, Typography, IconButton, Collapse, Box, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DownloadPaper from './DownloadPaper';

import { get_content_message } from '../../store/features/messages.slice';

const ContentCardTitle = ({content}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showContent, setShowContent] = useState(false);

  const [messages, setMessages] = useState(Array.from({ length: Object.keys(messageTypes).length }, () => []));

  const handleToggle = () => {
    setShowContent(!showContent);
  };

  React.useEffect(() => {
    if (content) {
      console.log(content)
      setShowContent(false);
      dispatch(get_content_message({ society_id: content.society_id, language_code: content.language_code, region_id: content.region_id, content_type: content.content_type })).then((response) => {
        const result = response.payload;
        if (result.status) {
          Object.keys(messageTypes).forEach((key, index) => {
            for (let i = 0; i < result.data.length; i++) {
              if (result.data[i].type === key) {
                setMessages(prevState => {
                    let temp = [...prevState];
                    temp[index].push(result.data[i]);
                    return temp;
                });
              }
            }
          });
        }
      });
    }
  }, [navigate]);

  return (
    <Paper style={{ padding: '20px', marginBottom: '10px' }} elevation={3}>
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <Typography variant="h6">{content.title}</Typography>
          <Typography>{content.description}</Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={handleToggle}>
            <ArrowForwardIosIcon style={{ 
                transform: showContent ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.3s ease'
              }} />
          </IconButton>
        </Grid>
      </Grid>
      <Collapse in={showContent}>
        <div style={{ marginTop: '20px' }}>
          <Paper sx={{ mb: 2, padding: 1, borderLeft: '12px solid #696969' }}>
            <Box sx={{ padding: 1, ml: 1, mt: 1 }}>
              <Typography variant="h3" sx={{ color: '#808080' }} >MORE INFORMATION</Typography>
              <Divider sx={{ mb: 2, mt: 1 }} />
              <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>{content.url}</Typography>
            </Box>
          </Paper>
        </div>
        <DownloadPaper messageList={messages} content={content} />
      </Collapse>
    </Paper>
  );
};

export default ContentCardTitle;
