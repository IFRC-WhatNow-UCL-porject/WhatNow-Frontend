import React from 'react';
import { Paper, Grid, Button, Typography, Divider, Pagination, Select, MenuItem, Table, TableBody, TableHead, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

import { get_api_users, get_user_role, get_user_society } from '../../store/features/gdpc_admin.slice';

import UserGrid from './UserGrid';

const LargePaperWithRows = ({selectedSociety}) => {

  const columns = ['First Name', 'Last Name', 'Location', 'Organization', 'Industry Type', 'Email', 'Last Active', 'Created At', 'Terms Version', 'Actions'];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);

    const [userList, setUserList] = useState([]);
    const [displayUserList, setDisplayUserList] = useState([]);

    React.useEffect(() => {
        dispatch(get_api_users()).then((response) => {
            const result = response.payload;
            if (result.status) {
                console.log(result.data)
                setTotalRows(result.data.length);
                setUserList(result.data);
                setDisplayUserList(result.data);
            }
        }
        );
    }, [navigate]);

    React.useEffect(() => {
        if (selectedSociety !== '') {
          console.log('selectedSociety:', selectedSociety);
            setDisplayUserList(userList.filter(user => user.society_id == selectedSociety));
        }
    }, [selectedSociety]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
    };

  return (
    <>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs>
            <Typography variant="h3">Current Users: {userList.length}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginBottom: 2 }} />

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayUserList.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((user, index) => (
                <UserGrid key={index} user={user}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ marginTop: '16px' }}></div>

        {/* pagination*/}
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              label="Rows per page"
            >
              {[5, 10, 15].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
            <Pagination
              count={Math.ceil(totalRows / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default LargePaperWithRows;
