import React, { useState } from 'react';
import { Paper, Typography, Grid, InputBase, Select, MenuItem, Box, styled, FormControl } from '@mui/material';

import { useDispatch } from "react-redux";

import { get_all_societies } from '../../store/features/gdpc_admin.slice';

import UserList from './UserList';

const CustomSelect = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // when input is focused
      '&:focus': {
        borderColor: 'black'
      },
    },
    // when mouse hover
    '&:hover': {
      '& .MuiInputBase-input': {
        borderRadius: 4,
        borderColor: 'black',
        boxShadow: '0 0 0 0.2rem rgba(0,0,0,.25)',
      },
    },
  }));

const ContentHeader = ({children}) => {

    const dispatch = useDispatch();

    const [dispalySocietyList, setDispalySocietyList] = useState([]);
    const [selectValueSociety, setSelectValueSociety] = useState('');

    React.useEffect(() => {
        dispatch(get_all_societies()).then((response) => {
            const result = response.payload;
            if (result.status) {
                setDispalySocietyList(result.data)
            }
        });
    }, []);

    const handleSelectChangesociety = (event) => {
        setSelectValueSociety(event.target.value);
    };

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
                    <Typography variant="h2" sx={{ paddingLeft: 2, fontWeight: 'bold' }} >MANAGE API USERS</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2} justifyContent="flex-end">
                      <Grid item xs={6} md={4}>
                        <FormControl sx={{width: 180}}>
                          <Select value={selectValueSociety} onChange={handleSelectChangesociety} displayEmpty fullWidth input={<CustomSelect />}>
                              <MenuItem value="" sx={{ display: 'none' }}>Select Society</MenuItem>
                              {dispalySocietyList.map((society, index) => {
                                    return <MenuItem value={society.uuid} key={index}>{society.society_name}</MenuItem>
                                })
                              }
                          </Select>
                        </FormControl>
                      </Grid>
                  </Grid>
              </Grid>
            </Grid>
          </Box>
      </Paper>
      {React.Children.map(children, (child) => {
        if (child.type === UserList) {
          return React.cloneElement(child, { selectedSociety: selectValueSociety });
        }
        return child;
      })}
    </>
  );
};

export default ContentHeader;
