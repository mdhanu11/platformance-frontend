import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box } from '@mui/material';
import Papa from 'papaparse';

const DailyGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Aggregate spends and CPI by date
        const aggregatedData = result.data.reduce((acc, row) => {
          const date = row.date;
          const spends = parseFloat(row.spends);
          const cpi = parseFloat(row.cpi);

          if (!acc[date]) {
            acc[date] = { date, spends: 0, cpi: 0 };
          }

          acc[date].spends += spends;
          acc[date].cpi += cpi;

          return acc;
        }, {});

        // Convert aggregated data into an array
        const formattedData = Object.keys(aggregatedData).map(date => aggregatedData[date]);

        setData(formattedData);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error); // Log any parsing errors
      },
    });
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Date-wise Spends and CPI Investments
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ width: `${data.length * 80}px`, minWidth: '100%' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="spends" fill="#1E90FF" />
              <Bar dataKey="cpi" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default DailyGraph;