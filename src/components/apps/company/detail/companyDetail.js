import React, { useEffect, useState } from 'react';
import { fetchcompanyPost } from 'src/store/apps/company/companySlice';
import { Link, useParams } from 'react-router-dom';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Tooltip,
  Box,
  Divider,
  Skeleton,
  Tabs,
  Tab,
  Button,
  Grid,
  Card,
} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { IconPoint } from '@tabler/icons';
import { useSelector } from 'react-redux';
import BlankCard from '../../../shared/BlankCard';
import { IconMaximize } from '@tabler/icons-react';
import { IconPhone } from '@tabler/icons-react';

const CompanyDetail = () => {
  const _id = useParams();
  const [tabValue, setTabValue] = useState(0); // State to track active tab
  const [isLoading, setLoading] = React.useState(true);

  // useEffect(() => {
  //   dispatch(fetchcompanyPost(_id));
  // }, [dispatch]);

  const post = useSelector((state) => state.companyReducer.selectedPost);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/apps/company/companies',
      title: 'company',
    },
    {
      title: 'company post',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Select jobs from Redux store and filter by jobId
  const companies = useSelector((state) => state.companyReducer.companyposts);
  const company = companies.find((job) => job._id === _id.id);

  return (
    <Box>
      <Breadcrumb title="Company Detail" items={BCrumb} />
      <BlankCard>
        <>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="square"
              width="100%"
              height={440}
              sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
            />
          ) : (
            <CardMedia
              component="img"
              height="70%"
              width="70%"
              image={company?.companyCover}
              alt="Company Cover"
            />
          )}
          <CardContent>
            <Stack direction="row" sx={{ marginTop: '-100px' }}>
              <Tooltip title={company ? company?.companyName : ''} placement="top">
                <Avatar
                  aria-label="author-avatar"
                  src={company?.companyLogo}
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                />
              </Tooltip>
              <Chip
                sx={{ marginLeft: 'auto', marginTop: '65px', backgroundColor: 'white' }}
                label="2 min Read"
                size="small"
              />
            </Stack>
            <Chip label={post?.companySize} size="small" sx={{ marginTop: 2 }} />
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h1"
                fontWeight={600}
                color="inherit"
                sx={{ textDecoration: 'none' }}
              >
                {company?.companyName}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Tooltip title="Company Size" placement="top">
                <Stack direction="row" gap={1} alignItems="center">
                  <IconMaximize size="20" /> {company?.companySize}
                </Stack>
              </Tooltip>
              <Tooltip title="Contact Number" placement="top">
                <Stack direction="row" gap={1} alignItems="center">
                  <IconPhone size="20" /> {company?.contactNumber}
                </Stack>
              </Tooltip>

              <Stack direction="row" ml="auto" alignItems="center">
                <IconPoint size="16" />
                {/* <small>{post ? <>{format(new Date(post.createdAt), 'E, MMM d')}</> : ''}</small> */}
              </Stack>
            </Stack>
          </CardContent>
        </>
      </BlankCard>
      {/* ----------------- this is Tabs --------------- */}
      <BlankCard>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="About" />
          <Tab label="Jobs" />
          <Tab label="Company perks & benefits" />
        </Tabs>
        <Divider />
        {tabValue === 0 && (
          <CardContent>
            <Typography variant="h4">About the Company</Typography>
            <Box sx={{ py: 2 }}>
              <div
                dangerouslySetInnerHTML={{ __html: company ? company.companyDescription : '' }}
              />
            </Box>
          </CardContent>
        )}
        {tabValue === 1 && (
          <CardContent>
            <Typography variant="h4">Company Jobs</Typography>
            <Box sx={{ py: 2 }}>No Jobs</Box>
          </CardContent>
        )}
        {tabValue === 2 && (
          <CardContent>
            <Typography variant="h4">Company perks & benefits</Typography>
            <Box p={2} bgcolor="grey[100]" mt={2}>
              <Typography>
                <div dangerouslySetInnerHTML={{ __html: company ? company.companyPerks : '' }} />
              </Typography>
            </Box>
          </CardContent>
        )}
      </BlankCard>

      {/* ----------------Featured Jobs Post---------------- */}
      <Box sx={{ padding: 4 }}>
        <Grid container spacing={4}>
          {/* Featured Job Card */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #4f46e5, #4f9cf0)',
                color: '#fff',
                borderRadius: 2,
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
                height: '100%',
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Post a featured job
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Accelerate the recruitment process and build your talent pool.
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  to={'/pages/pricing'}
                  sx={{
                    mt: 2,
                    backgroundColor: '#fff',
                    color: '#4f46e5',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#e2e8f0',
                    },
                  }}
                >
                  Post a featured job
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Free Job Card */}
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                background: '#f8fafc',
                color: '#0f172a',
                borderRadius: 2,
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
                height: '100%',
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Post a free job
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Post jobs for free.
                </Typography>
                <Button
                  component={Link}
                  to={'/apps/freejobpost'}
                  variant="contained"
                  color="primary"
                >
                  Post a free job
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CompanyDetail;
