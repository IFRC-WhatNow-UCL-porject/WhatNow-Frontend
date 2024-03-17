import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

import InternalServerError from './500';
import BadGatewayError from './502';

const Error = () => {

    const navigate = useNavigate();

    const [error, setError] = useState(0);

    React.useEffect(() => {
        if (localStorage.getItem('error')) {
            const code = localStorage.getItem('error');
            localStorage.removeItem('error');
            setError(code);
        } else {
            navigate('/');
        }
    }, [navigate]);

    return (
        <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
            {error == 500 ? <InternalServerError /> : error == 502 ? <BadGatewayError /> : <Typography variant="h1">Error</Typography>}
        </Container>
    );
}

export default Error;