import React from 'react';
import { Dialog, DialogContent, Typography, Button, Box, Icon } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const AlertPopup = ({ open, handleClose, text }) => {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <WarningAmberIcon sx={{ fontSize: 40, color: 'orange' }} />
        </Box>
        <Typography variant="h3">{text}</Typography>
        <Button variant="contained" color='secondary' onClick={handleClose} sx={{ marginTop: 3 }}>
          CLOSE
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AlertPopup;
