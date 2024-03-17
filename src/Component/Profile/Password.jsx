import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { TextField, Typography, Paper, Grid } from '@mui/material';

import LoadingButton from '../LoadingButton'

import { changePassword } from '../../store/features/profile.slice';

const PasswordPage = () => {

    const dispatch = useDispatch();

    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmedPasswordChange = (event) => {
        setConfirmedPassword(event.target.value);
    };

    const handleSubmit = () => {
        if (newPassword === confirmedPassword) {
            return dispatch(changePassword({uuid: JSON.parse(localStorage.getItem("user")).uuid, new_password: newPassword})).then((response) => {
                const result = response.payload;
                console.log('Result:', result)
                if (result.status) {
                    window.location.reload();
                }
            }).catch((error) => {
                console.log('Error:', error);
            });
        } else {
            return new Promise((resolve, reject) => {
                alert('Confirmed password does not match');
                reject();
            });
        }
    };

    return (
        <Paper sx={{ padding: 3, margin: 2, minHeight: 300}}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Typography variant="h2" gutterBottom>
                        Change Password
                    </Typography>
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        variant="outlined"
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmedPassword}
                        onChange={handleConfirmedPasswordChange}
                        variant="outlined"
                    />
                    <div style={{ marginTop: '10px'}}></div>
                    <LoadingButton text="Update" clickEvent={handleSubmit}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PasswordPage;
