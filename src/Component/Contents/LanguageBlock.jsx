import React, { useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Grid, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem } from '@mui/material';

import { useDispatch } from 'react-redux';

import { language_code } from '../../constant'
import { update_language, add_language } from '../../store/features/ns_admin.slice';

const LanguageBlock = ({language, language_list, society}) => {

  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);

  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    if (!society) {
      setIsDisabled(true);
      setUrl('');
      setDescription('');
      setMessage('');
    } else {
      if (!language) {
        setIsDisabled(false);
        setUrl('');
        setDescription('');
        setMessage('');
      } else {
        setIsDisabled(false);
        setUrl(language.url);
        setDescription(language.description);
        setMessage(language.message);
      }
    }
  }, [society, language]);

  // dialog
  const [isEditDialogOpen, setisEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setisAddDialogOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('none');

  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const [tempUrl, setTempUrl] = useState('');
  const [tempDescription, setTempDescription] = useState('');
  const [tempMessage, setTempMessage] = useState('');

  const handleOpenEditDialog = () => {
    setTempUrl(url);
    setTempDescription(description);
    setTempMessage(message);
    setisEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setisEditDialogOpen(false);
  };

  const handleOpenAddDialog = () => {
    setNewUrl('');
    setNewDescription('');
    setNewMessage('');
    setSelectValue('none');
    setisAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setisAddDialogOpen(false);
  };

  const handleUrlChange = (e) => {
    setTempUrl(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTempDescription(e.target.value);
  };

  const handleMessageChange = (e) => {
    setTempMessage(e.target.value);
  };

  const handleNewUrlChange = (e) => {
    setNewUrl(e.target.value);
  };

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleEditSubmit = () => {
    const values = {
        uuid: language.uuid,
        url: tempUrl,
        description: tempDescription,
        message: tempMessage
    }
    try {
        dispatch(update_language(values)).then((response) => {
            const result = response.payload;
            if (result.status) {
                handleCloseEditDialog();
                window.location.reload();
            }
        })
    } catch (err) {
        console.log(err);
    }
  };

  const handleAddSubmit = () => {
    const values = {
        society_id: society,
        language_code: selectValue,
        url: newUrl,
        description: newDescription,
        message: newMessage
    }
    try {
        dispatch(add_language(values)).then((response) => {
            const result = response.payload;
            if (result.status) {
                handleCloseAddDialog();
                window.location.reload();
            }
        })
    } catch (err) {
        console.log(err);
    }
  };


  return (
    <Box position='relative' borderRadius={1}>
        <Paper sx={{ padding: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
                <Grid item>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        Current Language: {language ? language.display : null}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" sx={{ marginRight: 3, fontWeight: 'bold' }} onClick={handleOpenEditDialog}>
                        EDIT
                    </Button>
                    <Button variant="contained" color="primary" sx={{ marginRight: 2, fontWeight: 'bold' }} onClick={handleOpenAddDialog}>
                        ADD NEW LANGUAGE
                    </Button>
                </Grid>
            </Grid>

            <Table sx={{ border: '2px solid rgba(224, 224, 224, 1)' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>URL</TableCell>
                        <TableCell>DESCRIPTION</TableCell>
                        <TableCell>Attribution message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {url !== '' ? (
                        <TableRow>
                            <TableCell>{url}</TableCell>
                            <TableCell>{description}</TableCell>
                            <TableCell>{message}</TableCell>
                        </TableRow>
                    ) : (
                        <TableRow style={{ height: 53 }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Paper>
        
        {isDisabled && (
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
            <DialogTitle variant="h3" sx={{ fontWeight: 'bold' }}>Change Language Attribution</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>URL</Typography>
                <TextField value={tempUrl} onChange={(e) => handleUrlChange(e)} fullWidth margin="dense" />
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>DESCRIPTION</Typography>
                <TextField value={tempDescription} onChange={(e) => handleDescriptionChange(e)} fullWidth margin="dense" />
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>ATTRIBUTION MESSAGE</Typography>
                <TextField
                    value={tempMessage}
                    onChange={(e) => handleMessageChange(e)}
                    fullWidth
                    margin="dense"
                    multiline
                    minRows={3} // min rows
                    maxRows={6} // max rows
                    InputProps={{ style: { resize: 'both' } }} // resize both
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCloseEditDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
                <Button variant="contained" color="secondary" onClick={handleEditSubmit} sx={{ marginRight: 1, fontWeight: 'bold' }} >SUBMIT</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} sx={{ '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '80%' } }}>
            <DialogTitle variant="h3" sx={{ fontWeight: 'bold' }}>Add New Language</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ marginTop: 1 }}>Language</Typography>
                <Select
                    defaultValue='none'
                    value={selectValue}
                    onChange={handleSelectChange}
                    fullWidth
                    margin="dense"
                    sx={{ border: '2px solid #ced4da', borderRadius: 1, marginTop: 1 }}
                >
                    <MenuItem value='none' sx={{ display: 'none' }}>Select A Language</MenuItem>
                    {Object.keys(language_code).map((lang, index) => (
                        <MenuItem key={index} value={lang} disabled={
                            language_list.find(item => item.language_code === lang) !== undefined
                        }>{language_code[lang]}</MenuItem>
                    ))}
                </Select>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>URL</Typography>
                <TextField value={newUrl} onChange={(e) => handleNewUrlChange(e)} fullWidth margin="dense" />
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>DESCRIPTION</Typography>
                <TextField value={newDescription} onChange={(e) => handleNewDescriptionChange(e)} fullWidth margin="dense" />
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>ATTRIBUTION MESSAGE</Typography>
                <TextField
                    value={newMessage}
                    onChange={(e) => handleNewMessageChange(e)}
                    fullWidth
                    margin="dense"
                    multiline
                    minRows={3} // min rows
                    maxRows={6} // max rows
                    InputProps={{ style: { resize: 'both' } }} // resize both
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCloseAddDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
                <Button variant="contained" color="secondary" onClick={handleAddSubmit} sx={{ marginRight: 1, fontWeight: 'bold' }} disabled={selectValue == 'none'}>SUBMIT</Button>
            </DialogActions>
        </Dialog>   
    </Box>
  );
};

export default LanguageBlock;
