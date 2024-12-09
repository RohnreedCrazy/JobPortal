import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { Grid } from '@mui/material';
import JobCarousel from 'src/components/apps/FindJobs/jobDetail/jobCarousel';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import DscHeader from '../../../layouts/full/shared/breadcrumb/DscHeader';
import PageContainer from '../../../components/container/PageContainer';
import JobDetail from 'src/components/apps/FindJobs/jobDetail/jobDetail';
import JobDesc from 'src/components/apps/FindJobs/jobDetail/jobDesc';
import JobRelated from 'src/components/apps/FindJobs/jobDetail/jobRelated';
import ChildCard from 'src/components/shared/ChildCard';


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Find Jobs',
    to: '/apps/FindJobs',
  },
  {
    title: 'Job detail',
  },
];

const JobDetailComponent = () => {

  const Id = useParams();
  const job = useSelector((state) => state.FindJobsReducer.jobs[Id.id - 1]);
  return (
    <PageContainer title="Job Detail" description="this is Job Detail page">
      {/* breadcrumb */}
      <Breadcrumb title="Job Detail" items={BCrumb} />
      <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
        <Grid item xs={12} sm={12} lg={12}>
          <ChildCard>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={7}>
                <DscHeader title={job.title} items={BCrumb} />
                <JobDesc />
              </Grid>
              <Grid item xs={12} sm={12} lg={5}>
                <JobDetail />
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <JobRelated />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default JobDetailComponent;
