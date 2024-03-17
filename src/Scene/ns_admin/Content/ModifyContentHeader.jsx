import React from 'react';
import { Paper, Typography, Grid, Box, Button} from '@mui/material';

const ContentHeader = ({submit, text, disabled}) => {

  return (
    <>
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
                        <Typography variant="h2" sx={{ paddingLeft: 2, fontWeight: 'bold' }} >{text}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item xs={6} md={3}>
                                <Button onClick={submit} variant="contained" color="secondary" disabled={disabled}>Save Changes</Button>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Button onClick={() => {window.location.href = '/ns_admin/content'}} variant="contained" color="primary">Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    </>
  );
};

export default ContentHeader;
