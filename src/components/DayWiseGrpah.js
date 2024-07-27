import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, Paper, Avatar } from '@mui/material';
import Papa from 'papaparse';
import moment from 'moment';
import EventIcon from '@mui/icons-material/Event';

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
        Day-wise Spends and CPI Investments
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#F7F9FC' }}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSpends" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1E90FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCpi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
            <XAxis dataKey="date" tick={{ fill: '#B0BEC5' }} />
            <YAxis tick={{ fill: '#B0BEC5' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Area
              type="monotone"
              dataKey="spends"
              stroke="#1E90FF"
              fillOpacity={1}
              fill="url(#colorSpends)"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              dot={{ stroke: '#1E90FF', strokeWidth: 2, r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="cpi"
              stroke="#00C49F"
              fillOpacity={1}
              fill="url(#colorCpi)"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              dot={{ stroke: '#00C49F', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default DailyGraph;