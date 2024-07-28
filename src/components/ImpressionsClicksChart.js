import React, { useEffect, useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, Paper } from '@mui/material';
import Papa from 'papaparse';
import GraphModal from './GraphModal';

const ImpressionsClicksChart = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Aggregate impressions and clicks by date, filtering out zero and NaN values
        const aggregatedData = result.data.reduce((acc, row) => {
          const date = row.date;
          const impressions = parseInt(row.impressions, 10);
          const clicks = parseInt(row.clicks, 10);

          // Skip rows where both impressions and clicks are zero or NaN
          if ((impressions === 0 && clicks === 0) || isNaN(impressions) || isNaN(clicks)) {
            return acc;
          }

          if (!acc[date]) {
            acc[date] = { date, impressions: 0, clicks: 0 };
          }

          acc[date].impressions += impressions;
          acc[date].clicks += clicks;

          return acc;
        }, {});

        // Convert aggregated data into an array and filter out dates where both impressions and clicks are zero or NaN
        const formattedData = Object.keys(aggregatedData)
          .map(date => aggregatedData[date])
          .filter(entry => (entry.impressions > 0 || entry.clicks > 0) && !isNaN(entry.impressions) && !isNaN(entry.clicks));

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
        Impressions vs Clicks Over Time
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: '#F7F9FC' }} onClick={handleOpenModal}>
        <Box sx={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis dataKey="date" tick={{ fill: '#B0BEC5' }} />
              <YAxis yAxisId="left" tick={{ fill: '#B0BEC5' }} label={{ value: 'Impressions', angle: -90, position: 'insideLeft', offset: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#B0BEC5' }} label={{ value: 'Clicks', angle: -90, position: 'insideRight', offset: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar yAxisId="left" dataKey="impressions" barSize={20} fill="#05CD99" />
              <Line yAxisId="right" type="monotone" dataKey="clicks" stroke="#84D9FC" strokeWidth={3} dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
      <GraphModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
        data={data}
        title="Impressions vs Clicks Over Time"
        xAxisKey="date"
        barKey="impressions"
        lineKey="clicks"
        yAxisLeftLabel="Impressions"
        yAxisRightLabel="Clicks"
      />
    </Box>
  );
};

export default ImpressionsClicksChart;