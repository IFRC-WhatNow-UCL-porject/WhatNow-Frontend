import React, { useState } from 'react';
import { Paper, Typography, Grid, InputBase, Select, MenuItem, Box, styled, FormControl } from '@mui/material';
import { language_code } from '../../constant';

import { useDispatch } from "react-redux";

import RegionList from './RegionList';

import { get_language, get_region } from '../../store/features/ns_admin.slice';

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
  const [selectValueSociety, setselectValueSociety] = useState('');
  const [selectValueLanguage, setselectValueLanguage] = useState('');

  const [languageList, setLanguageList] = useState([]);
  const [regionList, setRegionList] = useState([]);

  const dispatch = useDispatch();

  const displayLanguage = [];

  const matchLanguage = () => {
    for (let i = 0; i < languageList.length; i++) {
      const language = {
        ...languageList[i],
        display: language_code[languageList[i].language_code]
      }
      displayLanguage.push(language);
    }
  }

  React.useEffect(() => {
    setselectValueLanguage('');
    if (selectValueSociety) {
      dispatch(get_language({ society_id: selectValueSociety })).then((response) => {
        const result = response.payload;
        if (result.status) {
          setLanguageList(result.data);
        }
      });
    }
  }, [selectValueSociety]);

  React.useEffect(() => {
    matchLanguage();
    setLanguageList(displayLanguage);
  }, [languageList]);

  React.useEffect(() => {
    if (selectValueLanguage && selectValueSociety) {
      dispatch(get_region({ society_id: selectValueSociety, language_code: selectValueLanguage })).then((response) => {
        const result = response.payload;
        if (result.status) {
          setRegionList(result.data);
        }
      });
    }
  }, [selectValueLanguage]);

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
                      <Typography variant="h2" sx={{ paddingLeft: 2, fontWeight: 'bold' }} >MANAGE REGIONS</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Grid container spacing={2} justifyContent="flex-end">
                          <Grid item xs={6} md={4}>
                              <FormControl sx={{width: 180}}>
                                  <Select value={selectValueSociety} onChange={handleSelectChangeSociety} displayEmpty fullWidth input={<CustomSelect />}>
                                      <MenuItem value="" sx={{ display: 'none' }}>Select Society</MenuItem>
                                      {societyList.map((society, index) => {
                                          return <MenuItem key={index} value={society.uuid}>{society.society_name}</MenuItem>
                                      })}
                                  </Select>
                              </FormControl>
                          </Grid>
                          <Grid item xs={6} md={4}>
                              <FormControl disabled={selectValueSociety===''} sx={{width: 180}}>
                                  <Select value={selectValueLanguage} onChange={handleSelectChangeLanguage} displayEmpty fullWidth input={<CustomSelect />}>
                                      <MenuItem value="" sx={{ display: 'none' }}>Select Language</MenuItem>
                                      {languageList.map((language, index) => {
                                      return <MenuItem value={language.language_code} key={index}>{language.display}</MenuItem>
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
          if (child.type === RegionList) {
            return React.cloneElement(child, { regionList: regionList, selectedSociety: selectValueSociety, selectedLanguage: selectValueLanguage });
          }
          return child;
      })}
    </>
  );
};

export default ContentHeader;
