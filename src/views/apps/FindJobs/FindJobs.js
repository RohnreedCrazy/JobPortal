import React from 'react';
import { Box } from '@mui/material';

import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

import PageContainer from '../../../components/container/PageContainer';
import JobList from 'src/components/apps/FindJobs/jobGrid/jobList';
import JobSidebar from 'src/components/apps/FindJobs/jobGrid/jobSidebar';
import AppCard from 'src/components/shared/AppCard';

const BCrumb = [
  { 
    to: '/',
    title: 'Home',
  },
  {
    title: 'Find Jobs',
  },
];
const FindJobs = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);
  return (
    <PageContainer title="Job List" description="this is Job List page">
      {/* breadcrumb */}
      <Breadcrumb title="Find Jobs" items={BCrumb} />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        <JobSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={3} flexGrow={1}>
          <JobList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default FindJobs;
