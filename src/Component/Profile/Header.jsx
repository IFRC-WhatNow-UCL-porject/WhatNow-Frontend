import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Grid, Container, Box } from '@mui/material';

import LoadingButton from '../LoadingButton'

import UserInfo from './UserInfo';

import { updateUserInfo } from '../../store/features/profile.slice';

const ContentHeader = ({children}) => {

  const dispatch = useDispatch();

  const [info, setInfo] = useState({});

  const handleInfoChange = (info) => {
    setInfo(info);
  }

  const handleSaveChanges = () => {
    return dispatch(updateUserInfo({uuid: JSON.parse(localStorage.getItem("user")).uuid, ...info})).then((response) => {
        const result = response.payload;
        if (result.status) {
            window.location.reload();
        }
    }).catch((error) => {
        console.log('Error:', error);
    });
  }

  return (
    <>
        <Container maxWidth="lg">
            <Paper 
                sx={{
                    position: 'relative',
                    padding: 2, 
                    backgroundImage: 'url(' + process.env.PUBLIC_URL + '/tc.png)', 
                    backgroundSize: 'cover', 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100px',
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
                            <Typography variant="h2" sx={{ paddingLeft: 2, fontWeight: 'bold' }} >MY PROFILE</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Grid item xs={6} md={4}>
                                <LoadingButton text="Save Changes" clickEvent={handleSaveChanges} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
        {React.Children.map(children, (child) => {
            if (child.type === UserInfo) {
                return React.cloneElement(child, { handleInfoChange: handleInfoChange });
            }
            return child;
        })}
    </>
  );
};

export default ContentHeader;
