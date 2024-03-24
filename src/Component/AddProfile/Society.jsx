import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Button, Divider, IconButton, Box, Dialog, DialogContent, DialogActions, Select, MenuItem, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { get_all_societies } from '../../store/features/gdpc_admin.slice';

const SocietyPaper = ({user_id}) => {

  const dispatch = useDispatch();
  const [society, setSociety] = useState([]);
  const [allSocieties, setAllSocieties] = useState([{}]);

  React.useEffect(() => {
    dispatch(get_all_societies()).then((response) => {
      const result = response.payload;
      if (result.status) {
        setAllSocieties(result.data);
      }
    }
    );
  }, []);

  const handleCloseIconClick = (id) => {
    setSociety(society.filter((society) => society.uuid !== id));
  };

  React.useEffect(() => {
    localStorage.setItem('society', JSON.stringify(society.map((society) => society.uuid)));
  }, [society]);

  //dialog

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('none');

  const handleOpenAddDialog = () => {
    setSelectValue('none');
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleAddSubmit = () => {
    const newSociety = allSocieties.find((society) => society.uuid === selectValue);
    setSociety([...society, newSociety]);
    setIsAddDialogOpen(false);
  };

  return (
    <Paper sx={{ padding: 3, margin: 2, minHeight: 300}}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">SOCIETIES</Typography>
        <Button variant="contained" color="secondary" sx={{fontWeight: 'bold'}} onClick={() => handleOpenAddDialog()}>Add New Society</Button>
      </Box>
      <Divider style={{ margin: '20px 0' }} />

      <Box style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px' }}>
        {society.map((society, index) => (
          <Box key={index} display="flex" justifyContent="space-between" alignItems="center" bgcolor="#DCDCDC" borderRadius="10px" padding="10px" marginBottom="10px">
            <Typography sx={{ ml:2, fontWeight: 'bold' }}>{society.society_name}</Typography>
            <IconButton size="small" sx={{ mr:2 }} onClick={() => handleCloseIconClick(society.uuid)}>
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} sx={{ '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '80%' } }}>
        <DialogTitle variant="h3" sx={{ fontWeight: 'bold' }}>Add New Society</DialogTitle>
        <DialogContent>
            <Typography variant="subtitle1" sx={{ marginTop: 1 }}>Society</Typography>
            <Select
                defaultValue='none'
                value={selectValue}
                onChange={handleSelectChange}
                fullWidth
                margin="dense"
                sx={{ border: '2px solid #ced4da', borderRadius: 1, marginTop: 1 }}
            >
                <MenuItem value='none' sx={{ display: 'none' }}>Select A Society</MenuItem>
                {allSocieties.map((soc, index) => (
                    <MenuItem key={index} value={soc.uuid} disabled={
                      society.map((society) => society.uuid).includes(soc.uuid)
                    }>{soc.society_name}</MenuItem>
                ))}
            </Select>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="primary" onClick={handleCloseAddDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
            <Button variant="contained" color="secondary" onClick={handleAddSubmit} sx={{ marginRight: 1, fontWeight: 'bold' }} disabled={selectValue == 'none'}>SUBMIT</Button>
        </DialogActions>
      </Dialog>   
    </Paper>
  );
};

export default SocietyPaper;
