import React, { useEffect, useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, Paper } from '@mui/material';
import Papa from 'papaparse';
import GraphModal from './GraphModal';

const CountryWiseInstallsCPIChart = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Aggregate installs and CPI by country
        const aggregatedData = result.data.reduce((acc, row) => {
          const country = row.country;
          const installs = parseFloat(row.apps_flyer.replace(/[$,]/g, ''));
          const cpi = parseFloat(row.cpi);

          if (!acc[country]) {
            acc[country] = { country, installs: 0, cpi: 0 };
          }

          acc[country].installs += installs;
          acc[country].cpi = cpi; // Keep the latest CPI value

          return acc;
        }, {});

        // Convert aggregated data into an array and sort by installs in descending order
        const formattedData = Object.keys(aggregatedData)
          .map(country => aggregatedData[country])
          .sort((a, b) => b.installs - a.installs);

        setData(formattedData);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error); // Log any parsing errors
      },
    });
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Country-wise Installs vs CPI
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#F7F9FC' }} onClick={handleOpenModal}>
        <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis dataKey="country" tick={{ fill: '#B0BEC5' }} />
              <YAxis yAxisId="left" tick={{ fill: '#B0BEC5' }} label={{ value: 'Installs', angle: -90, position: 'insideLeft', offset: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#B0BEC5' }} label={{ value: 'CPI', angle: -90, position: 'insideRight', offset: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar yAxisId="left" dataKey="installs" barSize={20} fill="#05CD99" />
              <Line yAxisId="right" type="monotone" dataKey="cpi" stroke="#84D9FC" strokeWidth={3} dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      <GraphModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
        data={data}
        title="Country-wise Installs vs CPI"
        xAxisKey="country"
        barKey="installs"
        lineKey="cpi"
        yAxisLeftLabel="Installs"
        yAxisRightLabel="CPI"
      />
    </Box>
  );
};

export default CountryWiseInstallsCPIChart;