import { Container, Typography, Paper, Divider } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import BreadNav from '../../Component/BreadNav';

import { get_latest_term } from '../../store/features/auth.slice';

const Term = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [term, setTerm] = useState('');

    React.useEffect(() => {
        dispatch(get_latest_term()).then((response) => {
            const result = response.payload;
            if (result.status) {
                setTerm(result.data);
            }
        });
    }, []);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh' }} my={2} >
        <BreadNav
          path={
            [
              { path: '/', name: 'Home' },
              { path: '/terms_and_conditions', name: 'Terms and Conditions' }
            ]
          } 
        />
        <div style={{ marginTop: '16px' }}></div>
        <Paper style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="h2" sx={{fontWeight: 'bold'}}>Terms and Conditions</Typography>
            </div>

            <Divider style={{ marginBottom: '10px' }} />
            <Typography variant="h6">{term}</Typography>
        </Paper>
    </Container>
  );
};

export default Term;