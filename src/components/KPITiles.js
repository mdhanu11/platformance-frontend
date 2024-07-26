import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import Papa from 'papaparse';

const kpisTemplate = [
  { title: 'Spends', key: 'spends' },
  { title: 'Impressions', key: 'impressions' },
  { title: 'Clicks', key: 'clicks' },
  { title: 'Ad Platform Installs', key: 'ad_platform' },
  { title: 'AppsFlyer Installs', key: 'apps_flyer' },
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
            const value = parseFloat(row[kpi.key].replace(/[$,]/g, ''));
            return acc + (isNaN(value) ? 0 : value);
          }, 0);
          return { title: kpi.title, value: total };
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
    <Grid container spacing={3}>
      {kpis.map((kpi) => (
        <Grid item xs={12} sm={6} md={3} key={kpi.title}>
          <Paper elevation={3} style={{ background: '#F0F4F7', borderRadius: '8px' }}>
            <Box p={2} textAlign="center">
              <Typography variant="h6" color="textSecondary">
                {kpi.title}
              </Typography>
              <Typography variant="h4" style={{ color: '#1976d2' }}>
                {formatValue(kpi.title, kpi.value)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPITiles;