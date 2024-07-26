// App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, Box, CssBaseline } from '@mui/material';
import KPITiles from './components/KPITiles';
import KPITable from './components/KPITable';
import MonthlyGraph from './components/MonthlyGraph';
import DailyGraph from './components/DayWiseGrpah';
import InstallsBreakdown from './components/InstallsBreakdown';
import WeeklyRevenueGraph from './components/WeeklyRevenueGraph';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Platformance Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <KPITiles />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={2} bgcolor="background.paper" borderRadius="12px">
              <WeeklyRevenueGraph />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={2} bgcolor="background.paper" borderRadius="12px">
              <DailyGraph />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={2} bgcolor="background.paper" borderRadius="12px">
              <InstallsBreakdown />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={2} bgcolor="background.paper" borderRadius="12px">
              <MonthlyGraph />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box p={2} bgcolor="background.paper" borderRadius="12px">
              <KPITable />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;