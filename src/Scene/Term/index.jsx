import { Container, Typography, Paper, Divider } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import BreadNav from '../../Component/BreadNav';

import { get_latest_term } from '../../store/features/auth.slice';

import LoadingButton from '../../Component/LoadingButton';

import { update_term_agree } from '../../store/features/profile.slice';

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
                <LoadingButton
                    text="I Agree"
                    clickEvent={() => {
                        return dispatch(update_term_agree({ uuid: JSON.parse(localStorage.getItem("user")).uuid })).then((response) => {
                            const result = response.payload;
                            if (result.status) {
                                localStorage.setItem((localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : '') + "_agree", true);
                                navigate("/");
                            } else {
                                localStorage.setItem("fail", "Failed to agree to the terms and conditions. Please Log in first or try again.")
                                window.location.reload();
                            }
                        });
                    }}
                />
            </div>

            <Divider style={{ marginBottom: '10px' }} />
            <Typography variant="h6">{term}</Typography>
        </Paper>
    </Container>
  );
};

export default Term;