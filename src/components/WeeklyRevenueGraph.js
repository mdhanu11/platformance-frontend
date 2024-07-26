import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Typography, Box, Paper } from '@mui/material';
import Papa from 'papaparse';
import moment from 'moment';

const WeeklyRevenueGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Aggregate spends by week
        const aggregatedData = result.data.reduce((acc, row) => {
          const date = moment(row.date, 'YYYY-MM-DD');
          const week = date.isoWeek();  // ISO week number
          const spends = parseFloat(row.spends);

          if (!acc[week]) {
            acc[week] = { week, spends: 0 };
          }

          acc[week].spends += spends;

          return acc;
        }, {});

        // Convert aggregated data into an array and filter out weeks with zero spends
        const formattedData = Object.keys(aggregatedData)
          .map(week => aggregatedData[week])
          .filter(weekData => weekData.spends > 0);

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
        Weekly Revenue
      </Typography>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, backgroundColor: '#F7F9FC' }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ width: `${data.length * 80}px`, minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="week" tick={{ fill: '#757575' }} />
                <YAxis tick={{ fill: '#757575' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar
                  dataKey="spends"
                  barSize={30}
                  radius={[10, 10, 0, 0]}
                  animationDuration={1500}
                  animationBegin={500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WeeklyRevenueGraph;