// App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Typography, Box, CssBaseline, Toolbar } from '@mui/material';
import KPITiles from './components/KPITiles';
import KPITable from './components/KPITable';
import MonthlyGraph from './components/MonthlyGraph';
import DailyGraph from './components/DayWiseGrpah';
import InstallsBreakdown from './components/InstallsBreakdown';
import WeeklyRevenueGraph from './components/WeeklyRevenueGraph';
import theme from './theme';
import SideMenu from './components/SideMenu'; // Make sure to import the SideMenu
import CountrySpendsPieChart from './components/CountrySpendsPieChart';
import ImpressionsClicksChart from './components/ImpressionsClicksChart';
import CountryWiseInstallsCPIChart from './components/CountryWiseInstallsCPIChart';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box
          component="main"
          sx={{  bgcolor: 'background.default'}}
        >
          <Toolbar />
          <Container maxWidth="lg">
            <Typography variant="h5" sx={{mb: 2, color:'#000000'}}>
              Main Dashboard
            </Typography>
            <Grid container spacing={4} sx={{p: 1}}>
              <Grid item xs={12}>
                <KPITiles />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box p={2} bgcolor="background.paper" borderRadius="12px">
                  <ImpressionsClicksChart />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box p={2} bgcolor="background.paper" borderRadius="12px">
                  <CountryWiseInstallsCPIChart />
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
              <Grid item xs={12}>
                <Box p={2} bgcolor="background.paper" borderRadius="12px">
                  <KPITable />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;