import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Paper, Typography, Box, IconButton, Tooltip, Divider, Grid, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import PicGenerator from './PicGenerator';

import { messageTypes } from '../../constant';


const DownloadPaper = ({ messageList, content }) => {

  const colorScheme = ['#006A72', '#00BCD6', '#C5D86D', '#FFC200', '#EE3224', '#5C3160']

  const tooltipStyle = {
    fontSize: '1rem', 
  };

  const [hiddenRef, setHiddenRef] = useState(Array.from({ length: Object.keys(messageTypes).length }, () => null));

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleSetRef = (ref, index) => {
    setHiddenRef(prevState => {
      let temp = prevState;
      temp[index] = ref;
      return temp;
    });
  };

  const handleCaptureClick = async (index) => {
    const canvas = await html2canvas(hiddenRef[index].current, { scale: 10 }); // generate canvas
    const image = canvas.toDataURL('image/png');
    setImage(image);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {messageList.map((message, index) => {

        if (message.length === 0) {
          return;
        }

        return (
          <div style={{ marginTop: '20px' }}>
            <Paper sx={{ mb: 2, padding: 1, borderLeft: '12px solid ' + colorScheme[index] }}>
              <Box sx={{ padding: 1, ml: 1, mt: 1 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item xs={5}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Typography variant="h3" sx={{ color: '#808080' }}>{Object.keys(messageTypes)[index].replace('_', ' ')}</Typography>
                      </Grid>
                      <Grid item>
                        <Tooltip title={<span style={tooltipStyle}>PREPARE TO RESPOND</span>} placement="top">
                          <IconButton size="small">
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <PicGenerator handleSetRef={handleSetRef} content={content} message={message} index={index} />
                    <Button onClick={() => handleCaptureClick(index)} variant="contained" color="secondary" sx={{ fontWeight: 'bold', mb: 1 }}>
                      DOWNLOAD AS PICTURE
                    </Button>
                  </Grid>
                </Grid>
                <Divider sx={{ mb: 2, mt: 1 }} />
                {message.map((item, index) => {
                  return (
                    <Typography variant="h5" sx={{ mb: 3, mt: 3 }}>{index+1}.{item.content}</Typography>
                  )
                })}
              </Box>
            </Paper>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogTitle variant="h3" sx={{ fontWeight: 'bold', marginTop: 1 }}>Download As Image</DialogTitle>
              <Divider sx={{ mt: 2 }} />
              <DialogContent style={{ height: '70vh', overflowY: 'auto' }}>
                {image && (
                  <img 
                    src={image} 
                    alt="Captured content" 
                    style={{ maxWidth: '100%', maxHeight: 'auto' }}
                  />
                )}
              </DialogContent>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, ml: 2, color: '#808080', textAlign: 'center' }}>Please right click on the image and select "Save image as..." to download the image.</Typography>
            </Dialog>
          </div>
        );
      })}
    </>
  );
};

export default DownloadPaper;
