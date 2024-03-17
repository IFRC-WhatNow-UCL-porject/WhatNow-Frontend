import React, { useState } from 'react';
import { Paper, Typography, Grid, InputBase, Select, MenuItem, Box, styled, FormControl } from '@mui/material';

import { useDispatch } from "react-redux";

import { get_language, get_published_region, get_region_content } from '../../store/features/messages.slice';

import MessagesList from './MessagesList';

import { language_code } from '../../constant'

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

const MessageHeader = ({children, society}) => {

  const dispatch = useDispatch();

  const [selectValueSociety, setSelectValueSociety] = useState('');
  const [selectValueLanguage, setSelectValueLanguage] = useState('');
  const [selectValueRegion, setSelectValueRegion] = useState('');

  const [dispalySocietyList, setDisplaySocietyList] = useState([]);
  const [displayLanguageList, setDisplayLanguageList] = useState([]);
  const [displayRegionList, setDisplayRegionList] = useState([]);

  const [contentList, setContentList] = useState([]);

  React.useEffect(() => {
    if (society.length > 0) {
      setDisplaySocietyList(society);
    }
  }, [society]);

  const displayLanguage = [];

  const matchLanguage = (languageList) => {
    for (let i = 0; i < languageList.length; i++) {
      const language = {
        ...languageList[i],
        display: language_code[languageList[i].language_code]
      }
      displayLanguage.push(language);
    }
  }

  React.useEffect(() => {
    if (selectValueSociety !== '') {
      dispatch(get_language({ society_id: selectValueSociety })).then((response) => {
        const result = response.payload;
        if (result.status) {
          matchLanguage(result.data);
          setDisplayLanguageList(displayLanguage);
        }
      });
    }
  }, [selectValueSociety]);

  React.useEffect(() => {
    if (selectValueLanguage !== '') {
      dispatch(get_published_region({ society_id: selectValueSociety, language_code: selectValueLanguage })).then((response) => {
        const result = response.payload;
        if (result.status) {
          setDisplayRegionList(result.data);
        }
      });
    }
  }, [selectValueLanguage]);

  React.useEffect(() => {
    if (selectValueRegion !== '') {
      dispatch(get_region_content({ society_id: selectValueSociety, language_code: selectValueLanguage, region_id: selectValueRegion })).then((response) => {
        const result = response.payload;
        if (result.status) {
          setContentList(result.data);
        }
      });
    }
  }, [selectValueRegion]);

  const handleSelectChangesociety = (event) => {
    setSelectValueSociety(event.target.value);
  }

  const handleSelectChangelanguage = (event) => {
    setSelectValueLanguage(event.target.value);
  }

  const handleSelectChangeregion = (event) => {
    setSelectValueRegion(event.target.value);
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
                      <Typography variant="h2" sx={{ paddingLeft: 2, fontWeight: 'bold' }} >WHATNOW MESSAGES</Typography>
                      <Typography variant="h6" sx={{ paddingLeft: 3 }} >select on right hand side to show more</Typography>
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
                        <Grid item xs={6} md={4}>
                          <FormControl disabled={selectValueSociety===''} sx={{width: 180}}>
                            <Select value={selectValueLanguage} onChange={handleSelectChangelanguage} displayEmpty fullWidth input={<CustomSelect />}>
                                <MenuItem value="" sx={{ display: 'none' }}>Select Language</MenuItem>
                                {displayLanguageList.map((language, index) => {
                                      return <MenuItem value={language.language_code} key={index}>{language.display}</MenuItem>
                                  })
                                }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <FormControl disabled={(selectValueSociety==='')||(selectValueLanguage==='')} sx={{width: 180}}>
                            <Select value={selectValueRegion} onChange={handleSelectChangeregion} displayEmpty fullWidth input={<CustomSelect />}>
                                <MenuItem value="" sx={{ display: 'none' }}>Select Region</MenuItem>
                                {displayRegionList.map((region, index) => {
                                      return <MenuItem value={region.uuid} key={index}>{region.region_name}</MenuItem>
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
        if (child.type === MessagesList) {
          return React.cloneElement(child, { content: contentList, society: dispalySocietyList.find(society => society.uuid === selectValueSociety) ? dispalySocietyList.find(society => society.uuid === selectValueSociety) : ''});
        }
        return child;
      })}
    </>
  );
};

export default MessageHeader;
