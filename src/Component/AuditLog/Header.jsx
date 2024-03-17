import React, { useState } from 'react';
import { Paper, Typography, Grid, InputBase, Select, Box, MenuItem, styled } from '@mui/material';
import { language_code, contentTypes } from '../../constant';

import AuditList from './AuditList';

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

const ContentHeader = ({children, societyList}) => {
  const [selectValueHazard, setselectValueHazard] = useState('');
  const [selectValueSociety, setselectValueSociety] = useState('');
  const [selectValueLanguage, setselectValueLanguage] = useState('');

  const handleSelectChangeHazard = (event) => {
    setselectValueHazard(event.target.value);
  };

  const handleSelectChangeSociety = (event) => {
    setselectValueSociety(event.target.value);
  };

  const handleSelectChangeLanguage = (event) => {
    setselectValueLanguage(event.target.value);
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
                        <Typography variant="h2" sx={{ paddingLeft: 2, fontWeight: 'bold' }} >AUDIT LOGS</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item xs={6} md={4}>
                                <Select value={selectValueHazard} onChange={handleSelectChangeHazard} displayEmpty fullWidth input={<CustomSelect />}>
                                    <MenuItem value="" sx={{ display: 'none' }}>Select Hazard</MenuItem>
                                    {Object.keys(contentTypes).map((key, index) => {
                                        return <MenuItem key={index} value={key}>{contentTypes[key]}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Select value={selectValueSociety} onChange={handleSelectChangeSociety} displayEmpty fullWidth input={<CustomSelect />}>
                                    <MenuItem value="" sx={{ display: 'none' }}>Select Society</MenuItem>
                                    {societyList.map((society, index) => {
                                        return <MenuItem key={index} value={society.uuid}>{society.society_name}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Select value={selectValueLanguage} onChange={handleSelectChangeLanguage} displayEmpty fullWidth input={<CustomSelect />}>
                                    <MenuItem value="" sx={{ display: 'none' }}>Select Language</MenuItem>
                                    {Object.keys(language_code).map((key, index) => {
                                        return <MenuItem key={index} value={key}>{language_code[key]}</MenuItem>
                                    })}
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
        {React.Children.map(children, (child) => {
          if (child.type === AuditList) {
            return React.cloneElement(child, { hazard: selectValueHazard, society: selectValueSociety, language: selectValueLanguage });
          }
          return child;
        })}
    </>
  );
};

export default ContentHeader;
