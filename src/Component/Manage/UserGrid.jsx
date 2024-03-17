import React from 'react';
import { useNavigate } from "react-router-dom";
import { TableRow, TableCell, Grid, Button, Box } from '@mui/material';

import { userRoles } from '../../constant';

const GridPaper = (data) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    const params = {
        uuid: data.user.uuid
    };
    const to = '/gdpc_admin/edit_profile/';
    const searchParams = new URLSearchParams(params).toString();
    const path = `${to}?${searchParams}`;

    navigate(path);
  };

  return (
    <TableRow
        key={data.key}
    >
        <TableCell>{data.user.first_name}</TableCell>
        <TableCell>{data.user.last_name}</TableCell>
        <TableCell>{Object.keys(userRoles).find(key => userRoles[key] === data.user.role) ? Object.keys(userRoles).find(key => userRoles[key] === data.user.role).replace('_', ' ') : 'None'}</TableCell>
        <TableCell>{data.society.find(soc => soc.uuid == data.user.society) ? data.society.find(soc => soc.uuid == data.user.society).society_name : 'None'}</TableCell>
        <TableCell>{data.user.email}</TableCell>
        <TableCell>{new Date(data.user.createdAt).toLocaleString()}</TableCell>
        <TableCell>{data.user.last_active ? new Date(data.user.last_active).toLocaleString() : 'None'}</TableCell>
        <TableCell>{data.user.terms_version ? data.user.terms_version : 'None'}</TableCell>
        <TableCell>
            <Button variant="contained" color="primary" sx={{ fontWeight: 'bold'}} onClick={() => handleEditClick()}>EDIT</Button>
        </TableCell>
    </TableRow>
  );
};

export default GridPaper;
