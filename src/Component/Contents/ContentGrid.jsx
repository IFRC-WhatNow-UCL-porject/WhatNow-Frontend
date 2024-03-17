import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Paper, Grid, Button, Box } from '@mui/material';

import { contentTypes } from '../../constant';

import { delete_content } from '../../store/features/ns_admin.slice';

const GridPaper = (inp) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const content_to_render = inp.content;

  const content_type = contentTypes[content_to_render.content_type];

  const title = content_to_render.title;

  const description = content_to_render.description;

  const url = content_to_render.url;

  const handleEditClick = () => {
    const params = {
        content_id: content_to_render.uuid
    };
    const to = '/'+ inp.path +'/content/editcontent';
    const searchParams = new URLSearchParams(params).toString();
    const path = `${to}?${searchParams}`;

    navigate(path);
  }

  const handleDeleteClick = () => {
    try {
        dispatch(delete_content({uuid: content_to_render.uuid})).then((response) => {
            const result = response.payload;
            if (result.status) {
                window.location.reload();
            }
        })
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Box sx={{ marginY: 3 }}>
        <Paper sx={{
            padding: 2
        }}>
            <Grid container spacing={10} alignItems="center">
                <Grid item xs>
                    {content_type}
                </Grid>
                <Grid item xs sx={{ 
                    overflow: 'hidden', 
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3, // line number for display
                    textOverflow: 'ellipsis', 
                }}>
                    {title}
                </Grid>
                <Grid item xs>
                    {description}
                </Grid>
                <Grid item xs>
                    {url}
                </Grid>


                <Grid item xs container justifyContent="space-between">
                    <Button variant="contained" color="primary" sx={{ fontWeight: 'bold' }} onClick={handleEditClick} >EDIT</Button>
                    <Button variant="contained" color="secondary" sx={{ fontWeight: 'bold' }} onClick={handleDeleteClick} >DELETE</Button>
                </Grid>
            </Grid>
        </Paper>
    </Box>
  );
};

export default GridPaper;
