import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TablePagination } from '@mui/material';
import Papa from 'papaparse';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#f7f9fc',
  borderRadius: '12px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#05CD99',
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const KPITable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const filteredData = result.data.filter(row =>
          parseFloat(row.spends) !== 0 ||
          parseInt(row.impressions, 10) !== 0 ||
          parseInt(row.clicks, 10) !== 0 ||
          parseFloat(row.ad_platform) !== 0 ||
          parseFloat(row.apps_flyer) !== 0
        );
        setData(filteredData);
      },
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatValue = (value, isCurrency = false) => {
    const number = parseFloat(value);
    if (isNaN(number) || number === 0) return '-';
    return isCurrency ? `$${number.toFixed(2)}` : number.toFixed(2);
  };

  return (
    <Box>
      <Typography variant="h6" p={2} sx={{ color: '#05CD99', fontWeight: 'bold' }}>
        All KPIs per Channel
      </Typography>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Channel</StyledTableCell>
              <StyledTableCell>Spends</StyledTableCell>
              <StyledTableCell>Impressions</StyledTableCell>
              <StyledTableCell>Clicks</StyledTableCell>
              <StyledTableCell>Ad Platform</StyledTableCell>
              <StyledTableCell>Apps Flyer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <StyledTableRow key={index}>
                <TableCell>{row.channel || '-'}</TableCell>
                <TableCell>{formatValue(row.spends, true)}</TableCell>
                <TableCell>{formatValue(row.impressions)}</TableCell>
                <TableCell>{formatValue(row.clicks)}</TableCell>
                <TableCell>{formatValue(row.ad_platform)}</TableCell>
                <TableCell>{formatValue(row.apps_flyer)}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default KPITable;