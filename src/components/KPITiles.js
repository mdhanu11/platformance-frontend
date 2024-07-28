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
  borderRadius: '20px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  minHeight: '120px', // Set a minimum height for consistency
  width: '280px', // Explicitly set the width for smaller size
  margin: theme.spacing(1),
}));

const kpisTemplate = [
  { title: 'Spends', key: 'spends', icon: <AttachMoneyIcon /> },
  { title: 'Impressions', key: 'impressions', icon: <InsertChartIcon /> },
  { title: 'Clicks', key: 'clicks', icon: <BarChartIcon /> },
  { title: 'Ad Platform Installs', key: 'ad_platform', icon: <ShowChartIcon /> },
  { title: 'AppsFlyer Installs', key: 'apps_flyer', icon: <TrendingUpIcon /> },
  { title: 'CPI', key: 'cpi', icon: <TrendingUpIcon />, calculate: true },
];

const KPITiles = () => {
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    Papa.parse('/data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Calculate total spends and installs
        let totalSpends = 0;
        let totalInstalls = 0;

        const totals = kpisTemplate.map((kpi) => {
          if (kpi.calculate) return null; // Skip calculated metrics initially

          const total = result.data.reduce((acc, row) => {
            const value = row[kpi.key] ? parseFloat(row[kpi.key].replace(/[$,]/g, '')) : 0;
            return acc + (isNaN(value) ? 0 : value);
          }, 0);

          if (kpi.key === 'spends') {
            totalSpends = total;
          }
          if (kpi.key === 'ad_platform' || kpi.key === 'apps_flyer') {
            totalInstalls += total;
          }

          return { title: kpi.title, value: total, icon: kpi.icon };
        }).filter(kpi => kpi !== null); // Filter out null entries

        // Calculate CPI and add it to the totals
        const cpi = totalSpends / totalInstalls;
        totals.push({ title: 'CPI', value: isNaN(cpi) ? 0 : cpi, icon: <TrendingUpIcon /> });

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
    if (title === 'CPI') {
      return `$${value.toFixed(2)}`;
    }
    return value.toLocaleString();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, overflowX: 'auto', width: '100%' }}>
      {kpis.map((kpi) => (
        <StyledPaper key={kpi.title} elevation={3}>
          <Avatar sx={{ bgcolor: '#F5F7FE', mr: 2, color: 'primary.main' }}>{kpi.icon}</Avatar>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="subtitle1" color="textSecondary">
              {kpi.title}
            </Typography>
            <Typography variant="h5" sx={{ color: '#0D1A26', fontWeight: 'bold' }}>
              {formatValue(kpi.title, kpi.value)}
            </Typography>
          </Box>
        </StyledPaper>
      ))}
    </Box>
  );
};

export default KPITiles;