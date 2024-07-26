import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, Paper } from '@mui/material';
import Papa from 'papaparse';

const InstallsBreakdown = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Aggregate installs by channel
        const installsData = result.data.reduce((acc, row) => {
          const channel = row.channel;
          const installs = parseFloat(row.apps_flyer.replace(/[$,]/g, ''));
          if (!acc[channel]) {
            acc[channel] = 0;
          }
          acc[channel] += installs;
          return acc;
        }, {});

        // Convert aggregated data into an array
        const formattedData = Object.keys(installsData).map(channel => ({
          channel,
          installs: installsData[channel]
        }));

        setData(formattedData);
      },
    });
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Installs Breakdown
      </Typography>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, backgroundColor: '#F7F9FC' }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ width: `${data.length * 80}px`, minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1E90FF" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="installs" fill="url(#colorUv)" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default InstallsBreakdown;