import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: '#B0BEC5' }} />
                <YAxis tick={{ fill: '#B0BEC5' }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }} />
                <Legend />
                <defs>
                  <linearGradient id="colorSpends" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1E90FF" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <Bar dataKey="spends" fill="url(#colorSpends)" barSize={30} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default WeeklyRevenueGraph;