import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Grid, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Collapse, Alert, FormHelperText } from '@mui/material';

import { get_apis, add_api } from '../../store/features/api_user.slice';

const ApiHeader = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [apiNames, setApiNames] = useState([]);
  
    React.useEffect(() => {
      dispatch(get_apis()).then((response) => {
        const result = response.payload;
        if (result.status) {
          if (result.data.length > 0) {
            setApiNames(result.data.map((api) => api.name))
          } else {
            setApiNames([])
          }
        }
      })
    }, [navigate]);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const handleOpenAddDialog = () => {
        setName('');
        setDescription('');
        setValue(0);
        setAlertOpen(false);
        setAlertMessage('');
        setIsAddDialogOpen(true);
    }

    const handleCloseAddDialog = () => {
        setIsAddDialogOpen(false);
    }

    const handleNameChange = (e) => {
        if (e.target.value === '') {
            setNameError(true);
        } else {
            setNameError(false);
        }
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        if (e.target.value === '') {
            setDescriptionError(true);
        } else {
            setDescriptionError(false);
        }
        setDescription(e.target.value);
    }
  
    const handleChange = (event) => {
      const newValue = parseInt(event.target.value, 10);
      if (!isNaN(newValue)) {
        if (newValue >= 0) {
          setValue(newValue);
        }
      }
    };

    const handleAddSubmit = () => {
        for (let i = 0; i < apiNames.length; i++) {
            if (apiNames[i] == name) {
                setAlertOpen(true);
                setAlertMessage('Name already exists');
                return;
            }
        }
        if (name === '') {
            setAlertOpen(true);
            setAlertMessage('Please enter a name');
            return;
        }
        if (description === '') {
            setAlertOpen(true);
            setAlertMessage('Please enter a description');
            return;
        }
        if (value === 0) {
            setAlertOpen(true);
            setAlertMessage('Please enter a number of estimated users');
            return;
        }
        dispatch(add_api({ user_id: JSON.parse(localStorage.getItem("user")).uuid, name: name, description: description, reach: value.toString() })).then((response) => {
            const result = response.payload;
            if (result.status) {
                window.location.reload();
            }
        })
    }


  return (
    <>
        <Paper 
            sx={{
                position: 'relative',
                padding: 2, 
                backgroundImage: 'url(' + process.env.PUBLIC_URL + '/map.png)', 
                backgroundSize: 'cover', 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '200px',
                marginTop: 4
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(230, 230, 230, 0.5)',
                }}
            />

            <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" sx={{ paddingLeft: 2, fontWeight: 'bold' }} >MY APPS</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item xs={7} md={5}>
                                <Button variant="contained" color="primary" fullWidth sx={{ fontWeight: 'bold' }}>VIEW TERMS AND CONDITIONS</Button>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Button variant="contained" color="secondary" fullWidth sx={{ fontWeight: 'bold' }} onClick={() => handleOpenAddDialog()}>BUILD NEW APP</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
        <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} sx={{ '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '80%' } }}>
            <DialogTitle variant="h3" sx={{ fontWeight: 'bold' }}>Create New App</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Name</Typography>
                <TextField value={name} onChange={(e) => handleNameChange(e)} fullWidth margin="dense" />
                <FormHelperText style={{ fontSize: '1rem', color: nameError ? 'red' : 'inherit' }}>
                    {nameError ? 'please enter a name' : ''}
                </FormHelperText>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Description</Typography>
                <TextField
                    value={description}
                    onChange={(e) => handleDescriptionChange(e)}
                    fullWidth
                    margin="dense"
                    multiline
                    minRows={3} // min rows
                    maxRows={6} // max rows
                    InputProps={{ style: { resize: 'both' } }} // resize both
                />
                <FormHelperText style={{ fontSize: '1rem', color: descriptionError ? 'red' : 'inherit' }}>
                    {descriptionError ? 'please enter description' : ''}
                </FormHelperText>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Number of estimated users</Typography>
                <TextField
                    type="number"
                    value={value}
                    onChange={(e) => handleChange(e)}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCloseAddDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddSubmit}
                    sx={{ marginRight: 1, fontWeight: 'bold' }}
                    disabled={nameError || descriptionError || name === '' || description === ''}
                >
                    SUBMIT
                </Button>
            </DialogActions>
            <Collapse in={alertOpen}>
                <Alert severity="warning" onClose={() => setAlertOpen(false)}>
                    {alertMessage}
                </Alert>
            </Collapse>
        </Dialog>
    </>
  );
};

export default ApiHeader;
