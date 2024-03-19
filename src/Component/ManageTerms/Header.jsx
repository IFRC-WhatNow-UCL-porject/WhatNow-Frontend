import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Grid, Container, Box, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';

import { publish_term } from '../../store/features/gdpc_admin.slice';

import LoadingButton from '../LoadingButton';

const TermHeader = ({text, latestVersion, isCurrent}) => {

console.log(isCurrent, 'isCurrent')

  const dispatch = useDispatch();

    const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
    const [version, setVersion] = useState(latestVersion);
    const [tempVersion, setTempVersion] = useState(latestVersion);

    React.useEffect(() => {
        setVersion(latestVersion);
        setTempVersion(latestVersion);
    }, [latestVersion]);

    const handleOpenPublishDialog = () => {
        setTempVersion(version);
        setIsPublishDialogOpen(true);
    };

    const handleClosePublishDialog = () => {
        setIsPublishDialogOpen(false);
    };

    const handlePublishSubmit = () => {
        return dispatch(publish_term({version: tempVersion, term: text})).then((response) => {
            const result = response.payload;
            if (result.status) {
                const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = 'example.txt';
                a.click();
            
                URL.revokeObjectURL(url);
                window.location.href = '/gdpc_admin/manage_terms';
            }
        });
    };

    const hanldeMainVersionIncrease = () => {
        var temp = tempVersion.split('.');
        temp[0] = (parseInt(temp[0]) + 1).toString();
        temp[1] = '0';
        setTempVersion(temp.join('.'));
    };

    const hanldeSubVersionIncrease = () => {
        var temp = tempVersion.split('.');
        temp[1] = (parseInt(temp[1]) + 1).toString();
        if (temp[0] == (parseInt(version.split('.')[0]) + 1).toString()) {
            temp[0] = (parseInt(temp[0]) - 1).toString();
        };
        setTempVersion(temp.join('.'));
    };


  return (
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
                        <Typography sx={{ paddingLeft: 2, fontWeight: 'bold', fontSize: 25 }} >MANAGE TERMS AND CONDITIONS</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item xs={6} md={4}>
                            <Button variant="contained" color="secondary" sx={{fontWeight: 'bold'}} onClick={() => handleOpenPublishDialog()} disabled={(text == '') || !isCurrent}>
                                Publis New Version
                            </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
        <Dialog open={isPublishDialogOpen} onClose={handleClosePublishDialog} sx={{ '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '80%' } }}>
            <DialogTitle variant="h3" sx={{ fontWeight: 'bold' }}>Publish Option</DialogTitle>
            <DialogContent>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: '10px', fontWeight: 'bold' }}
                        onClick={() => hanldeMainVersionIncrease()}
                        disabled={tempVersion.split('.')[0] == (parseInt(version.split('.')[0]) + 1).toString()}
                    >
                        increase main version
                    </Button>
                    <Typography style={{ marginRight: '10px', marginLeft: '10px', fontWeight: 'bold' }}>{tempVersion.split('.')[0]}</Typography>
                    <Typography style={{ marginRight: '10px', marginLeft: '10px', fontWeight: 'bold' }}>.</Typography>
                    <Typography style={{ marginRight: '10px', marginLeft: '10px', fontWeight: 'bold' }}>{tempVersion.split('.')[1]}</Typography>
                    <Button
                        variant="contained" 
                        color="primary" 
                        style={{ marginLeft: '10px', fontWeight: 'bold' }} 
                        onClick={() => hanldeSubVersionIncrease()}
                        disabled={tempVersion.split('.')[1] == (parseInt(version.split('.')[1]) + 1).toString()}
                    >
                        increase sub version
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleClosePublishDialog} sx={{ marginRight: 1, fontWeight: 'bold' }}>CANCLE</Button>
                <LoadingButton text="PUBLISH" clickEvent={handlePublishSubmit} />
            </DialogActions>
        </Dialog>   
    </Container>
  );
};

export default TermHeader;
