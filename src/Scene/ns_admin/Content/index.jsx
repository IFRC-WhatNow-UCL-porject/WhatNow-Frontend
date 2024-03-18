import { Container } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ContentHeader from '../../../Component/Contents/Header';
import ContentList from '../../../Component/Contents/ContentList';
import LanguageBlock from '../../../Component/Contents/LanguageBlock';
import BreadNav from '../../../Component/BreadNav';

import { get_user_societies } from '../../../store/features/ns_admin.slice';

const Content = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_id = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).uuid : null;

  const [userSocietyList, setUserSocietyList] = useState([]);

  const fetchList = async () => {
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
  };

  React.useEffect(() => {
    fetchList();
  }, [navigate]);

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
      <BreadNav
        path={
          [
            { path: '/', name: 'Home' },
            { path: '/ns_admin/content', name: 'WhatNow Content' }
          ]
        } 
      />
      <div style={{ marginTop: '16px' }}></div>
      <ContentHeader userSociety={userSocietyList} >
        <div style={{ marginTop: '16px' }}></div>
        <LanguageBlock />
        <div style={{ marginTop: '16px' }}></div>
        <ContentList pathDirect={'ns_admin'} />
      </ContentHeader>
    </Container>
  );
};

export default Content;