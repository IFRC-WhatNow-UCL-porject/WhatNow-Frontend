import React, {useState} from 'react';
import { Container } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuditHeader from '../../../Component/AuditLog/Header';
import AuditList from '../../../Component/AuditLog/AuditList';

import BreadNav from '../../../Component/BreadNav';

import { get_audit_log, get_user_societies } from '../../../store/features/ns_admin.slice';

const AuditLog = ({isShowBread=false}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userSocietyList, setUserSocietyList] = useState([]);
  const [logList, setLogList] = useState([]);
  const user_id = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).uuid : null;

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

  React.useEffect(() => {
    const ids = userSocietyList.map((society) => society.uuid);
    dispatch(get_audit_log({ society_ids: ids })).then((response) => {
      const result = response.payload;
      if (result.status) {
        setLogList(result.data);
      }
    });
  }, [userSocietyList]);

  return (
    <Container maxWidth={false} sx={{ minHeight: '100vh', width: 1500, paddingTop: 3 }}>
      <BreadNav path={['Home', 'Audit Log']} isDisplay={isShowBread}/>
      <div style={{ marginTop: '16px' }}></div>
      <AuditHeader societyList={userSocietyList}>
        <div style={{ marginTop: '16px' }}></div>
        <AuditList auditLogs={logList}/>
      </AuditHeader>
    </Container>
  );
};

export default AuditLog;