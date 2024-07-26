import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
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

  // Define a color palette
  const colors = ['#1E90FF', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#9966FF', '#FF9F40'];

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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="installs" barSize={30}>
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

export default InstallsBreakdown;