import React, {useState} from 'react';
import { Container } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ApiHeader from '../../../Component/API/Header';
import KeysGrid from '../../../Component/API/KeysGrid';

import { get_apis } from '../../../store/features/api_user.slice';

const ApiPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(get_apis()).then((response) => {
      const result = response.payload;
      if (result.status) {
        console.log(result.data)
      }
    })
  }, [navigate]);

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
        <ApiHeader />
        <KeysGrid />
    </Container>
  );
};

export default ApiPage;