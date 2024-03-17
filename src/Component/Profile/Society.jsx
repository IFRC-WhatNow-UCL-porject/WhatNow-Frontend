import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Button, Divider, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { getUserSociety } from '../../store/features/profile.slice';

const MyPaperComponent = () => {

  const dispatch = useDispatch();
  const [society, setSociety] = useState([]);

  React.useEffect(() => {
    dispatch(getUserSociety({ uuid: JSON.parse(localStorage.getItem("user")).uuid })).then((response) => {
      const result = response.payload;
      if (result.status) {
        setSociety(result.data);
      }
    })
  }, []);

  const handleCloseIconClick = (id) => {
    console.log(id);
  };

  return (
    <Paper sx={{ padding: 3, margin: 2, minHeight: 300}}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">SOCIETIES</Typography>
        {/* <Button variant="contained" color="primary">按钮</Button> */}
      </Box>
      <Divider style={{ margin: '20px 0' }} />

      <Box style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px' }}>
        {society.map((society, index) => (
          <Box key={index} display="flex" justifyContent="space-between" alignItems="center" bgcolor="#DCDCDC" borderRadius="10px" padding="10px" marginBottom="10px">
            <Typography sx={{ ml:2, fontWeight: 'bold' }}>{society.society_name}</Typography>
            {/* <IconButton size="small" sx={{ mr:2 }} onClick={() => handleCloseIconClick(society.uuid)}>
              <CloseIcon />
            </IconButton> */}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default MyPaperComponent;
