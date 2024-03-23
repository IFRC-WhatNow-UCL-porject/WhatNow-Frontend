import React from 'react';

import { Paper, Grid, Typography, Select, MenuItem, Divider, styled, InputBase } from '@mui/material';

import ContentCardTitle from './ContentCardTitle';

import {contentTypes} from '../../constant';

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


const MessagesList = ({ content, society }) => {

    const [selectValueHazard, setSelectValueHazard] = React.useState('');
    const [contentList, setContentList] = React.useState([]);

    React.useEffect(() => {
        if (content.length > 0) {
            setContentList(content);
        }
    }, [content]);

    const handleSelectChangeHazard = (event) => {
        setSelectValueHazard(event.target.value);
    }

    return (
        <>
        <Paper sx={{ padding: 2, marginBottom: 2 }} elevation={3}>
          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item xs>
              <Typography variant="h3">WhatNow messages of the {society.society_name}</Typography>
            </Grid>
            <Grid item>
                <Select value={selectValueHazard} onChange={handleSelectChangeHazard} displayEmpty fullWidth input={<CustomSelect />}>
                    <MenuItem value="" sx={{ display: 'none' }}>Select Hazard</MenuItem>
                    {contentList.map((content, index) => {
                            return <MenuItem value={content.uuid} key={index}>{contentTypes[content.content_type]}</MenuItem>
                        })
                    }
                </Select>
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item>
              <Typography variant="h5">More Information: {society.url}</Typography>
            </Grid>
          </Grid>

          {contentList.map((content, index) => {
            return <ContentCardTitle key={index} content={content} />
          })}
        </Paper>
      </>
    );
}

export default MessagesList;