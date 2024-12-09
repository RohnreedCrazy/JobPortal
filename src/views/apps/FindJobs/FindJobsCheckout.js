import React from 'react';
import { Box } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import JobChecout from 'src/components/apps/FindJobs/jobCheckout/jobCheckout';
import ChildCard from 'src/components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Checkout',
  },
];

const FindJobsCheckout = () => {
  return (
    <PageContainer title="Checkout" description="this is Shop List page">
      {/* breadcrumb */}
      <Breadcrumb title="Checkout" items={BCrumb} />
      <ChildCard>
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box sx={{
          p: {
            xs: '0', sm: '24px'
          }
        }} flexGrow={1}>
          <JobChecout />
        </Box>
      </ChildCard>
    </PageContainer>
  );
};

export default FindJobsCheckout;
