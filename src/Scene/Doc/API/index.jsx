import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography, Paper, Divider, Box, Link } from '@mui/material';
import React from 'react';
import BreadNav from '../../../Component/BreadNav';

const APIdoc = () => {

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh' }} my={2} >
        <BreadNav
          path={
            [
              { path: '/', name: 'Home' },
              { path: '/api_document', name: 'API Document' }
            ]
          } 
        />
        <div style={{ marginTop: '16px' }}></div>
        <Paper style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h2" sx={{fontWeight: 'bold'}}>API Document</Typography>
            </div>

            <Divider style={{ marginBottom: '10px' }} />
            <Typography variant="h3" sx={{mt:5}}>Introduction</Typography>
            <Typography sx={{mt:2}}>
                The Red Cross REST API enables developers to access to emergency information and resources issued by international Red Cross Societies.
            </Typography>
            <Box
                sx={{
                backgroundColor: 'grey.300',
                borderRadius: '10px',
                padding: '20px',
                margin: '20px'
                }}
            >
                <Typography variant="h5">
                    Support & Questions
                </Typography>
                <Typography sx={{mt:1}}>
                    For questions about the Red Cross API please contact dev@3sidedcube.com
                </Typography>
            </Box>
            <Typography variant="h3" sx={{mt:5}}>Base URL</Typography>
            <Typography sx={{mt:2}}>
                All URLs in the API v1.0 documentation have the following base URL:
            </Typography>
            <Typography style={{ fontFamily: 'Consolas', marginTop: 10 }}>
                https://api-preparecenter.azurewebsites.net/api/app
            </Typography>
            <Divider style={{ marginTop: '20px', marginBottom: '10px' }} />
            <Typography variant="h3" sx={{mt:5}}>Authentication</Typography>
            <Typography sx={{mt:2}}>
                The API requires authentication to access all resources using an API key. To obtain an API key, firstly&nbsp;
                <Link href="/sign_up_guide" target="_blank" rel="noopener noreferrer">
                    create an application
                </Link>.
            </Typography>
            <Typography sx={{mt:2}}>
                All API requests must include the following HTTP header:
            </Typography>
            <Typography style={{ fontFamily: 'Consolas', marginTop: 10 }}>
                x-api-key: your_application_api_key
            </Typography>
            <Divider style={{ marginTop: '20px', marginBottom: '10px' }} />
            <Typography variant="h3" sx={{mt:5}}>Response codes</Typography>
            <Typography sx={{mt:2}}>
                The API uses the following response codes:
            </Typography>
            <Typography style={{ fontFamily: 'Consolas', marginTop: 10 }}>
                200 - OK: The request was successful
            </Typography>
            <Typography style={{ fontFamily: 'Consolas', marginTop: 10 }}>
                400 - Bad Request: The request was invalid
            </Typography>
            <Typography style={{ fontFamily: 'Consolas', marginTop: 10 }}>
                401 - Unauthorized: Your API key is invalid
            </Typography>
            <Typography style={{ fontFamily: 'Consolas', marginTop: 10 }}>
                403 - Forbidden: You don't have permission to access the resource
            </Typography>
            <Typography style={{ fontFamily: 'Consolas', marginTop: 10 }}>
                404 - Not Found: The resource was not found
            </Typography>
            <Typography style={{ fontFamily: 'Consolas', marginTop: 10 }}>
                500 - Internal Server Error: There was an error on the server
            </Typography>
            <Divider style={{ marginTop: '20px', marginBottom: '10px' }} />
            <Typography variant="h3" sx={{mt:5}}>What Now</Typography>
            <Typography sx={{mt:2}}>
                The following endpoints provide structured data published by Red Cross societies to assist with disaster preparedness for a variety of event types.
            </Typography>
            <Typography sx={{mt:2}}>
                Each entry provides information on six stages of disaster management:
            </Typography>
            <Typography variant="h5" style={{ fontFamily: 'Consolas', marginTop: 20, marginLeft: 30 }} sx={{fontWeight: 'bold'}}>
            • mitagation
            </Typography>
            <Typography variant="h5" style={{ fontFamily: 'Consolas', marginTop: 10, marginLeft: 30 }} sx={{fontWeight: 'bold'}}>
            • seasonal forecast
            </Typography>
            <Typography variant="h5" style={{ fontFamily: 'Consolas', marginTop: 10, marginLeft: 30 }} sx={{fontWeight: 'bold'}}>
            • warning
            </Typography>
            <Typography variant="h5" style={{ fontFamily: 'Consolas', marginTop: 10, marginLeft: 30 }} sx={{fontWeight: 'bold'}}>
            • watch
            </Typography>
            <Typography variant="h5" style={{ fontFamily: 'Consolas', marginTop: 10, marginLeft: 30 }} sx={{fontWeight: 'bold'}}>
            • immediate
            </Typography>
            <Typography variant="h5" style={{ fontFamily: 'Consolas', marginTop: 10, marginLeft: 30 }} sx={{fontWeight: 'bold'}}>
            • recover
            </Typography>
            <Typography variant="h5" sx={{mt:2, fontWeight: 'bold'}}>
                Endpoint:
            </Typography>
            <Typography variant="h5" style={{ fontFamily: 'Consolas', marginTop: 10, marginLeft: 30 }}>
                GET /org/:country_code/whatnow?eventType=xxx
            </Typography>
            <Typography variant="h5" sx={{mt:2, fontWeight: 'bold'}}>
                Example:
            </Typography>
            <Typography variant="h5" style={{ fontFamily: 'Consolas', marginTop: 10, marginLeft: 30 }}>
                GET /org/AO/whatnow?eventType=AIR
            </Typography>
            <Typography variant="h5" sx={{mt:2, fontWeight: 'bold'}}>
                Query Parameters:
            </Typography>
            <TableContainer sx={{mt:2, mb: 3}}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell style={{ width: '70%' }}>description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell>eventType</TableCell>
                    <TableCell>Optional event type filter. Multiple event types may be separated using a comma.</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Container>
  );
};

export default APIdoc;