import React, {useState} from 'react';
import { Container } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadNav from '../../../Component/BreadNav';

import ApiHeader from '../../../Component/API/Header';
import KeysGrid from '../../../Component/API/KeysGrid';

import { get_apis_by_user_id } from '../../../store/features/api_user.slice';

const ApiPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [apis, setApis] = useState([]);

  React.useEffect(() => {
    dispatch(get_apis_by_user_id({ user_id: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).uuid : null })).then((response) => {
      const result = response.payload;
      if (result.status) {
        if (result.data.length > 0) {
          setApis(result.data)
        } else {
          setApis([])
        }
      }
    })
  }, [navigate]);

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
      <BreadNav
        path={
          [
            { path: '/', name: 'Home' },
            { path: '/reviewer/my_apps', name: 'My Apps' }
          ]
        } 
      />
      <div style={{ marginTop: '16px' }}></div>
      <ApiHeader />
      <KeysGrid apps={apis} />
    </Container>
  );
};

export default ApiPage;