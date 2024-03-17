import React from 'react';
import { Paper, Grid, Button, Typography, Divider, Pagination, Select, MenuItem, Table, TableBody, TableHead, TableCell, TableContainer, TableRow } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

import { get_all_users, get_user_role, get_user_society } from '../../store/features/gdpc_admin.slice';

import UserGrid from './UserGrid';

const LargePaperWithRows = ({society, selectedSociety, selectedRole, selectedStatus}) => {

  const columns = ['First Name', 'Last Name', 'Role', 'Society', 'Email', 'Created At', 'Last Active', 'Terms Version', 'Actions'];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);

    const [userList, setUserList] = useState([]);
    const [displayUserList, setDisplayUserList] = useState([]);

    React.useEffect(() => {
        dispatch(get_all_users()).then((response) => {
            const result = response.payload;
            if (result.status) {
                console.log(result.data)
                setTotalRows(result.data.length);
                var user_list = result.data;
                dispatch(get_user_role()).then((response) => {
                    const result = response.payload;
                    if (result.status) {
                        user_list.forEach(user => {
                            user.role = result.data.find(role => role.user_id == user.uuid).role_id;
                        });
                        dispatch(get_user_society()).then((response) => {
                            const result = response.payload;
                            if (result.status) {
                                user_list.forEach(user => {
                                    user.society = result.data.find(data => data.user_id == user.uuid) ? result.data.find(data => data.user_id == user.uuid).society_id : null;
                                });
                                console.log(user_list);
                                setUserList(user_list);
                                setDisplayUserList(user_list);
                            }
                        });
                    }
                });
            }
        }
        );
    }, [navigate]);

    React.useEffect(() => {
        if (selectedSociety && selectedRole && (selectedStatus !== '')) {
            setDisplayUserList(userList.filter(user => user.society == selectedSociety && user.role == selectedRole && user.status == selectedStatus));
        } else if (selectedSociety && selectedRole) {
            setDisplayUserList(userList.filter(user => user.society == selectedSociety && user.role == selectedRole));
        } else if (selectedSociety && (selectedStatus !== '')) {
            setDisplayUserList(userList.filter(user => user.society == selectedSociety && user.status == selectedStatus));
        } else if (selectedRole && (selectedStatus !== '')) {
            setDisplayUserList(userList.filter(user => user.role == selectedRole && user.status == selectedStatus));
        } else if (selectedSociety) {
            setDisplayUserList(userList.filter(user => user.society == selectedSociety));
        } else if (selectedRole) {
            setDisplayUserList(userList.filter(user => user.role == selectedRole));
        } else if (selectedStatus !== '') {
            setDisplayUserList(userList.filter(user => user.status == selectedStatus));
        } else {
            setDisplayUserList(userList);
        }
    }, [selectedSociety, selectedRole, selectedStatus]);

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
          <Grid item>
            <Button variant="contained" color="secondary" sx={{ fontWeight: 'bold' }} onClick={() => navigate('/gdpc_admin/add_user')}>Add New User</Button>
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
                <UserGrid key={index} user={user} society={society}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
