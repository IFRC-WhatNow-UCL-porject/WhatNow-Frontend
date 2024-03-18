import React, {useState} from 'react';
import { Container } from '@mui/material';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { get_user_societies } from '../../../store/features/ns_admin.slice';
import BreadNav from '../../../Component/BreadNav';

import Header from '../../../Component/Region/Header';
import RegionList from '../../../Component/Region/RegionList';


const Region = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user_id = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).uuid : null;

    const [userSocietyList, setUserSocietyList] = useState([])
  
    React.useEffect(() => {
      try {
        dispatch(get_user_societies({ uuid: user_id })).then((response) => {
          const result = response.payload;
          if (result.status) {
            setUserSocietyList(result.data);
          }
        })
      } catch (err) {
        console.log(err);
      }
    }, [navigate]);

    return (
      <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
        <BreadNav
          path={
            [
              { path: '/', name: 'Home' },
              { path: '/ns_editor/region', name: 'Region' }
            ]
          } 
        />
        <div style={{ marginTop: '16px' }}></div>
        <Header societyList={userSocietyList}>
          <div style={{ marginTop: '16px' }}></div>
          <RegionList/>
        </Header>
      </Container>
    );
}

export default Region;