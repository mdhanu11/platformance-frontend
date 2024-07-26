import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box, Avatar } from '@mui/material';
import Papa from 'papaparse';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFFFFF', // Light background color
  color: '#0D1A26', // Dark text color
  padding: theme.spacing(2), // Reduce padding for smaller size
  borderRadius: '12px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  minHeight: '120px', // Set a minimum height for consistency
  width: '180px', // Explicitly set the width for smaller size
}));

const kpisTemplate = [
  { title: 'Spends', key: 'spends', icon: <AttachMoneyIcon /> },
  { title: 'Impressions', key: 'impressions', icon: <InsertChartIcon /> },
  { title: 'Clicks', key: 'clicks', icon: <BarChartIcon /> },
  { title: 'Ad Platform Installs', key: 'ad_platform', icon: <ShowChartIcon /> },
  { title: 'AppsFlyer Installs', key: 'apps_flyer', icon: <TrendingUpIcon /> },
];

const KPITiles = () => {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const totals = kpisTemplate.map((kpi) => {
          const total = result.data.reduce((acc, row) => {
            const value = row[kpi.key] ? parseFloat(row[kpi.key].replace(/[$,]/g, '')) : 0;
            return acc + (isNaN(value) ? 0 : value);
          }, 0);
          return { title: kpi.title, value: total, icon: kpi.icon };
        });
        setKpis(totals);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error); // Log any parsing errors
      },
    });
  }, []);

  const formatValue = (title, value) => {
    if (title === 'Spends') {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap', gap: 2 }}>
      {kpis.map((kpi) => (
        <StyledPaper key={kpi.title} elevation={3}>
          <Avatar sx={{ bgcolor: '#A0D7E7', mb: 1 }}>{kpi.icon}</Avatar> {/* Reduce margin-bottom */}
          <Typography variant="subtitle1" color="textSecondary">
            {kpi.title}
          </Typography>
          <Typography variant="h5" sx={{ color: '#0D1A26', fontWeight: 'bold' }}> {/* Use h5 for slightly smaller text */}
            {formatValue(kpi.title, kpi.value)}
          </Typography>
        </StyledPaper>
      ))}
    </Box>
  );
};

export default KPITiles;