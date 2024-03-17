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

const SortableTable = ({auditLogs, hazard, society, language}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('time');
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
    if (auditLogs) {
      const filteredRows = auditLogs.filter((row) => {
        if (society && row.society_id !== society) {
          return false;
        }
        if (language && row.language_code !== language) {
          return false;
        }
        if (hazard && row.content_type !== hazard) {
          return false;
        }
        return true;
      });
      setRows(filteredRows);
    }
  }, [auditLogs, hazard, society, language]);

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
              <TableCell sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('user')}>
                  {order === 'asc' && orderBy === 'user' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                User
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('action')}>
                  {order === 'asc' && orderBy === 'action' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Action
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('content_type')}>
                  {order === 'asc' && orderBy === 'content_type' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Content
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('language_code')}>
                  {order === 'asc' && orderBy === 'language_code' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Language Code
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('society')}>
                  {order === 'asc' && orderBy === 'society' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Society
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '17px'}}>
                <IconButton onClick={handleSort('time')}>
                  {order === 'asc' && orderBy === 'time' ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
                Created At
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" sx={{ fontSize: '14px'}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar style={{ marginRight: '8px', backgroundColor: 'red', color: 'white', fontSize: '12px', width: '30px', height: '30px' }}>{row.user.split(' ')[0][0] + row.user.split(' ')[1][0]}</Avatar>
                    {row.user}
                  </div>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '14px'}}>{action[row.action]}</TableCell>
                <TableCell align="right" sx={{ fontSize: '14px'}}>{contentTypes[row.content_type]}</TableCell>
                <TableCell align="right" sx={{ fontSize: '14px'}}>{language_code[row.language_code]}</TableCell>
                <TableCell align="right" sx={{ fontSize: '14px'}}>{row.society}</TableCell>
                <TableCell align="right" sx={{ fontSize: '14px'}}>{new Date(row.time).toLocaleString()}</TableCell>
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
