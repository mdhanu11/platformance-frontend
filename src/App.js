import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import KPITiles from './components/KPITiles';
import KPITable from './components/KPITable';
import MonthlyGraph from './components/MonthlyGraph';
import DailyGraph from './components/DayWiseGrpah';
import InstallsBreakdown from './components/InstallsBreakdown';

function App() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <KPITiles />
        </Grid>
        <Grid item xs={12}>
          <Box p={2} bgcolor="background.paper" borderRadius="12px">
            <KPITable />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box p={2} bgcolor="background.paper" borderRadius="12px">
            <DailyGraph />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box p={2} bgcolor="background.paper" borderRadius="12px">
            <MonthlyGraph />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box p={2} bgcolor="background.paper" borderRadius="12px">
            <InstallsBreakdown />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;