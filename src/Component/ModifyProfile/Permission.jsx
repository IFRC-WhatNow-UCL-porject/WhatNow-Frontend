import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Typography, Paper, Grid, Select, MenuItem } from '@mui/material';

import LoadingButton from '../LoadingButton'

import { userRoles } from '../../constant';

import { getUserRole } from '../../store/features/profile.slice';

import { sendActivationEmail, changeStatus } from '../../store/features/gdpc_admin.slice';

const PermissionCard = ({user_id, email, status}) => {

    const dispatch = useDispatch();

    const [selectValue, setSelectValue] = useState(0);
    const [role, setRole] = useState(0);

    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
    };

    React.useEffect(() => {
        localStorage.setItem('role', selectValue);
    }, [selectValue]);

    React.useEffect(() => {
        dispatch(getUserRole({ user_id: user_id })).then((response) => {
            const result = response.payload;
            if (result.status) {
                setRole(result.data.role_id);
                setSelectValue(result.data.role_id);
            }
        })
    }, []);

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
                        <Typography variant="h4" gutterBottom>
                            ROLE & PERMISSIONS
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Current Role: {Object.keys(userRoles).find(key => userRoles[key] == role) ? Object.keys(userRoles).find(key => userRoles[key] == role).replace('_', ' ') : 'None'}
                        </Typography>
                        <Select
                            defaultValue='none'
                            value={selectValue}
                            onChange={handleSelectChange}
                            fullWidth
                            margin="dense"
                            sx={{ border: '2px solid #ced4da', borderRadius: 1, marginTop: 1 }}
                        >
                            <MenuItem value='none' sx={{ display: 'none' }}>Select A Role</MenuItem>
                            {Object.keys(userRoles).map((role, index) => (
                                role == 'API_USER' ? null : <MenuItem key={index} value={userRoles[role]}>{role.replace('_', ' ')}</MenuItem>
                            ))}
                        </Select>
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
