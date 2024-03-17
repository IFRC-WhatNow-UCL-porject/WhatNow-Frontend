import { Container } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import BreadNav from '../../Component/BreadNav';
import MessagesHeader from '../../Component/Messages/Header';
import MessagesList from '../../Component/Messages/MessagesList';

import { get_all_societies } from '../../store/features/messages.slice';

const Content = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [societyList, setSocietyList] = useState([]);

  const fetchList = async () => {
    try {
      dispatch(get_all_societies()).then((response) => {
        const result = response.payload;
        if (result.status) {
          setSocietyList(result.data);
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
      <BreadNav path={['Home', 'Whatnow Content']} />
      <div style={{ marginTop: '16px' }}></div>
      <MessagesHeader society={societyList}>
        <div style={{ marginTop: '16px' }}></div>
        <MessagesList />
      </MessagesHeader>

    </Container>
  );
};

export default Content;