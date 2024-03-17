import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TableRow, TableCell } from '@mui/material';

const GridPaper = (data) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    const params = {
        uuid: data.user.uuid
    };
    const to = '/gdpc_admin/edit_api_user/';
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
        <TableCell>{data.user.location}</TableCell>
        <TableCell>{data.user.organization}</TableCell>
        <TableCell>{data.user.industry_type}</TableCell>
        <TableCell>{data.user.email}</TableCell>
        <TableCell>{data.user.last_active ? new Date(data.user.last_active).toLocaleString() : 'None'}</TableCell>
        <TableCell>{new Date(data.user.createdAt).toLocaleString()}</TableCell>
        <TableCell>{data.user.terms_version ? data.user.terms_version : 'None'}</TableCell>
        <TableCell>
            <Button variant="contained" color="primary" sx={{ fontWeight: 'bold'}} onClick={() => handleEditClick()}>EDIT</Button>
        </TableCell>
    </TableRow>
  );
};

export default GridPaper;
