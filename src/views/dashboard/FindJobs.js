import React from 'react';
import { Box, Grid } from '@mui/material';
import WeeklyStats from 'src/components/dashboards/modern/WeeklyStats';
import YearlySales from 'src/components/dashboards/FindJobs/YearlySales';
import PaymentGateways from 'src/components/dashboards/FindJobs/PaymentGateways';
import WelcomeCard from 'src/components/dashboards/FindJobs/WelcomeCard';
import Payment from 'src/components/dashboards/FindJobs/Payment';
import SalesProfit from 'src/components/dashboards/FindJobs/SalesProfit';
import RevenueUpdates from 'src/components/dashboards/FindJobs/RevenueUpdates';
import SalesOverview from 'src/components/dashboards/FindJobs/SalesOverview';
import TotalEarning from 'src/components/dashboards/FindJobs/TotalEarning';
import JobsSold from 'src/components/dashboards/FindJobs/jobsSold';
import MonthlyEarnings from 'src/components/dashboards/FindJobs/MonthlyEarnings';
import JobPerformances from 'src/components/dashboards/FindJobs/jobPerformances';
import RecentTransactions from 'src/components/dashboards/FindJobs/RecentTransactions';

const FindJobs = () => {
  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={12} lg={8}>
          <WelcomeCard />
        </Grid>

        {/* column */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Payment />
            </Grid>
            <Grid item xs={12} sm={6}>
              <JobsSold />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <RevenueUpdates />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <SalesOverview />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TotalEarning />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SalesProfit />
            </Grid>
            <Grid item xs={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
        {/* column */}
        <Grid item xs={12} sm={6} lg={4}>
          <WeeklyStats />
        </Grid>
        {/* column */}
        <Grid item xs={12} lg={4}>
          <YearlySales />
        </Grid>
        {/* column */}
        <Grid item xs={12} lg={4}>
          <PaymentGateways />
        </Grid>
        {/* column */}

        <Grid item xs={12} lg={4}>
          <RecentTransactions />
        </Grid>
        {/* column */}

        <Grid item xs={12} lg={8}>
          <JobPerformances />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FindJobs;
