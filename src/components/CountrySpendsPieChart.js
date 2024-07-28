import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, Paper } from '@mui/material';
import Papa from 'papaparse';

const CountrySpendsPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Aggregate spends by country
        const aggregatedData = result.data.reduce((acc, row) => {
          const country = row.country;
          const spends = parseFloat(row.spends);

          if (!acc[country]) {
            acc[country] = { country, spends: 0 };
          }

          acc[country].spends += spends;

          return acc;
        }, {});

        // Convert aggregated data into an array
        const formattedData = Object.keys(aggregatedData).map(country => aggregatedData[country]);

        setData(formattedData);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error); // Log any parsing errors
      },
    });
  }, []);

  // Define a color palette
  const colors = ['#1E90FF', '#00C49F', '#FFBB28', '#FF8042'];

  // Custom label rendering to avoid overlap
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${data[index].country}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Spends by Country
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#F7F9FC' }}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="spends"
              nameKey="country"
              cx="50%"
              cy="50%"
              outerRadius={120}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default CountrySpendsPieChart;