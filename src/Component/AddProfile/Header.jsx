import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Grid, Container, Box } from '@mui/material';

import LoadingButton from '../LoadingButton'

import { createProfile } from '../../store/features/gdpc_admin.slice';
import { check_email_exist } from '../../store/features/auth.slice';

import UserInfo from './UserInfo';

const ContentHeader = ({children}) => {

  const dispatch = useDispatch();

  const [info, setInfo] = useState({});
  const [showWrongMessage, setShowWrongMessage] = useState(false);

  const handleInfoChange = (info) => {
    setShowWrongMessage(false);
    setInfo(info);
  };

  const handleSaveChanges = () => {
    return dispatch(check_email_exist({email: info.email})).then((response) => {
        const result = response.payload;
        if (result.status) {
            var data = {
                first_name: info.first_name,
                last_name: info.last_name,
                email: info.email,
            }
            if (localStorage.getItem('role')) {
                data.user_role = localStorage.getItem('role');
                localStorage.removeItem('role');
            }
            if (localStorage.getItem('society')) {
                data.society = JSON.parse(localStorage.getItem('society'));
                localStorage.removeItem('society');
            }
            return dispatch(createProfile(data)).then((response) => {
                const result = response.payload;
                if (result.status) {
                    window.location.href = '/gdpc_admin/manage_users';
                }
            }).catch((error) => {
                console.log('Error:', error);
            });
        } else {
            setShowWrongMessage(true);
        }
    }
    );
  };

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
                                    <LoadingButton text="Create and Invite" clickEvent={handleSaveChanges} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
        {React.Children.map(children, (child) => {
            if (child.type === UserInfo) {
                console.log('UserInfo');
                return React.cloneElement(child, { handleInfoChange: handleInfoChange, showWrongMessage: showWrongMessage});
            }
            return child;
        })}
    </>
  );
};

export default ContentHeader;
