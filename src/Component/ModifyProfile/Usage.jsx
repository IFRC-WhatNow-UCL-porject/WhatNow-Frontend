import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Typography, Paper, Grid, TextField } from '@mui/material';

import LoadingButton from '../LoadingButton'

import { sendActivationEmail, changeStatus } from '../../store/features/gdpc_admin.slice';

const PermissionCard = ({user_id, email, status, usage}) => {

    const dispatch = useDispatch();

    const handleSendEmail = () => {
        return dispatch(sendActivationEmail({ email: email })).then((response) => {
            const result = response.payload;
            if (result.status) {
                console.log('Email sent');
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleDeActivation = () => {
        return dispatch(changeStatus({ uuid: user_id, status: 0 })).then((response) => {
            const result = response.payload;
            if (result.status) {
                console.log('User deactivated');
                window.location.href = '/gdpc_admin/manage_users';
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleActivation = () => {
        return dispatch(changeStatus({ uuid: user_id, status: 1 })).then((response) => {
            const result = response.payload;
            if (result.status) {
                console.log('User activated');
                window.location.href = '/gdpc_admin/manage_users';
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <Paper sx={{ padding: 3, margin: 2, minHeight: 300}}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom sx={{mb:3}}>
                            Where will this API be used?
                        </Typography>
                        <TextField
                            multiline
                            value={usage ? usage : "No usage information available"}
                            placeholder="No usage information available"
                            variant="outlined"
                            rows={3}
                            style={{ width: '100%' }}
                            disabled
                        />
                        <div style={{ marginTop: '30px'}}></div>
                        <Typography variant="h4" gutterBottom sx={{mb:3}}>
                            CHANGE USER STATUS
                        </Typography>
                        <LoadingButton text="Resend Email" clickEvent={handleSendEmail}/>
                        {status == 1 ? <LoadingButton text="Deactivate User" clickEvent={handleDeActivation}/> : <LoadingButton text="Activate User" clickEvent={handleActivation}/> }
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default PermissionCard;
