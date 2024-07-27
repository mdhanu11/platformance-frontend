import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Box, Paper, Avatar } from '@mui/material';
import Papa from 'papaparse';
import moment from 'moment';
import EventIcon from '@mui/icons-material/Event';

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
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#F7F9FC' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#E0F7FA', mr: 2 }}>
            <EventIcon sx={{ color: '#00796B' }} />
          </Avatar>
        </Box>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSpends" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
            <XAxis dataKey="week" tick={{ fill: '#B0BEC5' }} />
            <YAxis tick={{ fill: '#B0BEC5' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Area
              type="monotone"
              dataKey="spends"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorSpends)"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default WeeklyRevenueGraph;