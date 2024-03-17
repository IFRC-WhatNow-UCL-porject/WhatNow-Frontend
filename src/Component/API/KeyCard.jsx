import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, Divider, Button, IconButton, Menu, MenuItem, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Collapse, Alert } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { update_api, delete_api } from '../../store/features/api_user.slice';

const CustomCard = ({ title, description, reach, detailText, names }) => {

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(detailText);
      console.log('Text copied');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [currentName, setCurrentName] = useState('');
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    React.useEffect(() => {
      setCurrentName(title);
      setCurrentDescription(description);
      setCurrentValue(reach);
    }, [title, description, reach]);

    const handleOpenEditDialog = () => {
        handleClose();
        setCurrentName(title);
        setCurrentDescription(description);
        setCurrentValue(reach);
        setAlertOpen(false);
        setAlertMessage('');
        setIsEditDialogOpen(true);
    }

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
    }

    const handleNameChange = (e) => {
        setCurrentName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setCurrentDescription(e.target.value);
    }
  
    const handleChange = (event) => {
      const newValue = parseInt(event.target.value, 10);
      if (!isNaN(newValue)) {
        if (newValue >= 0) {
          setCurrentValue(newValue);
        }
      }
    };

    const handleEditSubmit = () => {
        if (currentName === '') {
            setAlertOpen(true);
            setAlertMessage('Name cannot be empty');
            return;
        }
        if (currentDescription === '') {
            setAlertOpen(true);
            setAlertMessage('Description cannot be empty');
            return;
        }
        if (currentValue <= 0) {
            setAlertOpen(true);
            setAlertMessage('Value cannot be negative or zero');
            return;
        }
        if (names.includes(currentName)) {
            setAlertOpen(true);
            setAlertMessage('Name already exists');
            return;
        }
        dispatch(update_api({ uuid: detailText, name: currentName, description: currentDescription, reach: currentValue.toString() })).then((response) => {
            const result = response.payload;
            if (result.status) {
                window.location.reload();
                setIsEditDialogOpen(false);
            }
        });
    }

    const handleDeleteClick = () => {
        handleClose();
        dispatch(delete_api({ uuid: detailText })).then((response) => {
            const result = response.payload;
            if (result.status) {
                window.location.reload();
            }
        });
    }

  return (
    <Card>
      <CardContent>
        <IconButton aria-label="settings" onClick={handleClick} style={{ float: 'right' }}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => handleOpenEditDialog()}>Edit</MenuItem>
          <MenuItem onClick={() => handleDeleteClick()}>Delete</MenuItem>
        </Menu>
        <Typography variant="h2" sx={{mb:1, fontWeight: 'bold'}}>{title}</Typography>
        <Typography variant="h5" sx={{mb:1, mt:1, ml:1}}>{description}</Typography>
        <Typography variant="h5" sx={{mb:1, mt:1}}>Number of predicted hits: {reach}</Typography>
        <Divider style={{ margin: '10px 0' }} />
        <Box display="flex" alignItems="center" justifyContent="space-between" bgcolor="grey.300" borderRadius="10px" p="10px">
          <Typography>{detailText}</Typography>
          <Button onClick={handleCopy} sx={{fontWeight:'bold', color:'black'}}>Copy</Button>
        </Box>
      </CardContent>
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} sx={{ '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '80%' } }}>
            <DialogTitle variant="h3" sx={{ fontWeight: 'bold' }}>Update Current App</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Name</Typography>
                <TextField value={currentName} onChange={(e) => handleNameChange(e)} fullWidth margin="dense" />
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Description</Typography>
                <TextField
                    value={currentDescription}
                    onChange={(e) => handleDescriptionChange(e)}
                    fullWidth
                    margin="dense"
                    multiline
                    minRows={3} // min rows
                    maxRows={6} // max rows
                    InputProps={{ style: { resize: 'both' } }} // resize both
                />
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Number of estimated users</Typography>
                <TextField
                    type="number"
                    value={currentValue}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCloseEditDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
                <Button variant="contained" color="secondary" onClick={handleEditSubmit} sx={{ marginRight: 1, fontWeight: 'bold' }} >SUBMIT</Button>
            </DialogActions>
            <Collapse in={alertOpen}>
                <Alert severity="warning" onClose={() => setAlertOpen(false)}>
                    {alertMessage}
                </Alert>
            </Collapse>
        </Dialog>
    </Card>
  );
};

export default CustomCard;
