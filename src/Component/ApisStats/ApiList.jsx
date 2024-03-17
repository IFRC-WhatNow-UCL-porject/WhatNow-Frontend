import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Avatar } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { contentTypes, language_code, action } from '../../constant';

// sorting algorithm
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};
const getComparator = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

// stable sort
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const SortableTable = ({apiList}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
      setRows(apiList);
    }, [apiList]);

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0);
  };


  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const paginatedRows = stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('username')}>
                  {order === 'asc' && orderBy === 'username' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Username
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('organization')}>
                  {order === 'asc' && orderBy === 'organization' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Organization
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('location')}>
                  {order === 'asc' && orderBy === 'location' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Location
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('application')}>
                  {order === 'asc' && orderBy === 'application' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Application Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('hits')}>
                  {order === 'asc' && orderBy === 'hits' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Number of Hits
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('reach')}>
                  {order === 'asc' && orderBy === 'reach' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Estimated Reach
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{ fontSize: '14px'}}>{row.user_name}</TableCell>
                <TableCell align="center" sx={{ fontSize: '14px'}}>{row.organization}</TableCell>
                <TableCell align="center" sx={{ fontSize: '14px'}}>{row.location}</TableCell>
                <TableCell align="center" sx={{ fontSize: '14px'}}>{row.name}</TableCell>
                <TableCell align="center" sx={{ fontSize: '14px'}}>{row.hits}</TableCell>
                <TableCell align="center" sx={{ fontSize: '14px'}}>{row.reach}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </paper>
  );
};

export default SortableTable;
