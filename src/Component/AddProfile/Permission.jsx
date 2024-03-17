import React, { useState } from 'react';
import { Typography, Paper, Grid, Select, MenuItem } from '@mui/material';

import { userRoles } from '../../constant';

const PermissionCard = () => {

    const [selectValue, setSelectValue] = useState(0);

    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
    };

    React.useEffect(() => {
        localStorage.setItem('role', selectValue);
    }, [selectValue]);

    return (
        <>
            <Paper sx={{ padding: 3, margin: 2, minHeight: 300}}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom sx={{mt:8}}>
                            ROLE & PERMISSIONS
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
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default PermissionCard;
