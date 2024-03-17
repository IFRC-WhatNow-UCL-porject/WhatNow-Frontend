import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Typography, Dialog, DialogActions, DialogTitle, DialogContent, TextField, Alert, Collapse, FormHelperText } from '@mui/material';

import { useDispatch } from "react-redux";

import { update_region, add_region, delete_region, init_content, check_region, get_contentIds_under_region, delete_content } from '../../store/features/ns_admin.slice';

const RegionTable = ({regionList, selectedSociety, selectedLanguage}) => {

  const dispatch = useDispatch();

  const [isDisplay, setIsDisplay] = useState(true);

  React.useEffect(() => {
    if (selectedSociety && selectedLanguage) {
      setIsDisplay(false);
    } else {
      setIsDisplay(true);
    }
  }, [selectedSociety, selectedLanguage]);

  // dialog
  const [isEditDialogOpen, setisEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setisAddDialogOpen] = useState(false);

  const [uuid, setUuid] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleOpenEditDialog = (uuid) => {
    setAlertOpen(false);
    setAlertMessage('Alert');
    setName(regionList.find(region => region.uuid === uuid).region_name);
    setDescription(regionList.find(region => region.uuid === uuid).description);
    setUuid(uuid);
    setNameError(false);
    setDescriptionError(false);
    setisEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setisEditDialogOpen(false);
  };

  const handleOpenAddDialog = () => {
    setAlertOpen(false);
    setAlertMessage('Alert');
    setName('');
    setDescription('');
    setNameError(false);
    setDescriptionError(false);
    setisAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setisAddDialogOpen(false);
  };

  const handleNameChange = (e) => {
    setAlertOpen(false);
    if (e.target.value === '') {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setAlertOpen(false);
    if (e.target.value === '') {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    setDescription(e.target.value);
  };

  const handleEditSubmit = () => {
    const values = {
        uuid: uuid,
        region_name: name,
        description: description,
    };
    try {
        dispatch(check_region({
            uuid: uuid,
            society_id: selectedSociety,
            language_code: selectedLanguage,
            region_name: name,
            action: 'update'
        })).then((response) => {
            const result = response.payload;
            if (result.status) {
                dispatch(update_region(values)).then((response) => {
                    const result = response.payload;
                    if (result.status) {
                        handleCloseEditDialog();
                        window.location.reload();
                    }
                });
            } else {
                setAlertMessage('Region name already exists');
                setAlertOpen(true);
            }
        })
    } catch (err) {
        console.log(err);
    }
  };

  const handleAddSubmit = () => {
    const values = {
        region_name: name,
        description: description,
        society_id: selectedSociety,
        language_code: selectedLanguage,
        is_published: false,
    };
    try {
        dispatch(check_region({
            society_id: selectedSociety,
            language_code: selectedLanguage,
            region_name: name,
            action: 'add'
        })).then((response) => {
            const result = response.payload;
            if (result.status) {
                dispatch(add_region(values)).then((response) => {
                    const result = response.payload;
                    if (result.status) {
                        dispatch(init_content({ society_id: selectedSociety, language_code: selectedLanguage, region_id: result.data.uuid })).then((response) => {
                            const result = response.payload;
                            if (result.status) {
                                handleCloseAddDialog();
                                window.location.reload();
                            }
                        })
                    }
                });
            } else {
                setAlertMessage('Region name already exists');
                setAlertOpen(true);
            }
        })
    } catch (err) {
        console.log(err);
    }
  };

  const handleDelete = (uuid) => {
    const values = {
        uuid: uuid,
    };
    try {
        dispatch(get_contentIds_under_region({ region_id: uuid, society_id: selectedSociety, language_code: selectedLanguage })).then((response) => {
            const result = response.payload;
            if (result.status) {
                result.data.map((content) => {
                    dispatch(delete_content({ uuid: content }))
                })
                dispatch(delete_region(values)).then((response) => {
                    const result = response.payload;
                    if (result.status) {
                        window.location.reload();
                    }
                });
            }
        })
    } catch (err) {
        console.log(err);
    }
  }

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('Alert');

  return (
    <Box position='relative' borderRadius={1}>
        <Paper sx={{ position: 'relative', padding: 2, paddingBottom: '64px'}}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell sx={{ width: '20%' }}>Region</TableCell>
                    <TableCell sx={{ width: '40%' }}>Description</TableCell>
                    <TableCell sx={{ width: '20%' }}>Is Published</TableCell>
                    <TableCell sx={{ width: '30%' }}>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {regionList.map((region, index) => (
                        <TableRow key={index}>
                            <TableCell>{region.region_name}</TableCell>
                            <TableCell>{region.description}</TableCell>
                            <TableCell>{region.is_published ? 'Yes' : 'No'}</TableCell>
                            <TableCell>
                                <Button variant="contained" sx={{ marginRight: 1 }} onClick={() => handleOpenEditDialog(region.uuid)}>Edit</Button>
                                <Button variant="contained" onClick={() => handleDelete(region.uuid)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ position: 'absolute', right: 16, bottom: 16 }}>
                <Button variant="contained" onClick={handleOpenAddDialog}>Add New Region</Button>
            </Box>
        </Paper>

        {isDisplay && (
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgcolor="rgba(0, 0, 0, 0.5)"
                zIndex={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius={1}
                onClick={(e) => e.stopPropagation()}
            >
                <Typography variant="h3" color="white">
                    Please Select Society and Language First
                </Typography>
            </Box>
        )}

        <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} sx={{ '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '80%' } }}>
            <DialogTitle variant="h3" sx={{ fontWeight: 'bold' }}>Edit Region</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Region Name</Typography>
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
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCloseEditDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleEditSubmit} 
                    sx={{ marginRight: 1, fontWeight: 'bold' }}
                    disabled={name === '' || description === '' || nameError || descriptionError}
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
        <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} sx={{ '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '80%' } }}>
            <DialogTitle variant="h3" sx={{ fontWeight: 'bold' }}>Create New Region</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Region Name</Typography>
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
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCloseAddDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleAddSubmit} 
                    sx={{ marginRight: 1, fontWeight: 'bold' }}
                    disabled={name === '' || description === '' || nameError || descriptionError}
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
    </Box>
  );
};

export default RegionTable;
