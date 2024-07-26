import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Typography, Box } from '@mui/material';
import Papa from 'papaparse';

const MonthlyGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Aggregate spends and CPI by month
        const aggregatedData = result.data.reduce((acc, row) => {
          const month = row.month;  // Assuming there's a 'month' field in the CSV
          const spends = parseFloat(row.spends);
          const cpi = parseFloat(row.cpi);

          if (!acc[month]) {
            acc[month] = { month, spends: 0, cpi: 0 };
          }

          acc[month].spends += spends;
          acc[month].cpi += cpi;

          return acc;
        }, {});

        // Convert aggregated data into an array
        const formattedData = Object.keys(aggregatedData).map(month => aggregatedData[month]);

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
        Month-wise Spends and CPI Investments
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
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
  );
};

export default MonthlyGraph;