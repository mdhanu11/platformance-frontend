import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
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

  // Define a color palette
  const colors = ['#1E90FF', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#9966FF', '#FF9F40'];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Day-wise Spends and CPI Investments
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
              <Bar dataKey="spends" barSize={30}>
                {data.map((entry, index) => (
                  <Cell key={`cell-spends-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
              <Bar dataKey="cpi" barSize={30}>
                {data.map((entry, index) => (
                  <Cell key={`cell-cpi-${index}`} fill={colors[(index + 1) % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default DailyGraph;