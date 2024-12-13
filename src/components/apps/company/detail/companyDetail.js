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
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { IconEye, IconMessage2, IconPoint, IconQuote } from '@tabler/icons';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import BlankCard from '../../../shared/BlankCard';

const CompanyDetail = () => {

  const dispatch = useDispatch();
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
      to: '/apps/company/posts',
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
            <CardMedia component="img" height="440" image={company?.companyLogo} alt="Company Cover" />
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
                {company?.companyIndustry}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Stack direction="row" gap={1} alignItems="center">
                <IconEye size="18" /> {company?.companyIndustry}
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <IconMessage2 size="18" /> {company?.companyIndustry}
              </Stack>

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
            <Typography variant="h2">About the Company</Typography>
            <p>
              But you cannot figure out what it is or what it can do. MTA web directory is the
              simplest way in which one can bid on a link, or a few links if they wish to do so.
            </p>
            <p>
              The link directory on MTA displays all of the links it currently has, and does so in
              alphabetical order, making it easier to find specific content.
            </p>
          </CardContent>
        )}
        {tabValue === 1 && (
          <CardContent>
            <Typography variant="h2">Company Jobs</Typography>
            <ul>
              <li>Figure out what it is or</li>
              <li>The links it currently has</li>
              <li>It allows you to start your bid</li>
              <li>Slowly work your way to the top of the list</li>
            </ul>
          </CardContent>
        )}
        {tabValue === 2 && (
          <CardContent>
            <Typography variant="h2">Company perks & benefits</Typography>
            <Box p={2} bgcolor="grey[100]" mt={2}>
              <Typography variant="h6">
                <IconQuote /> Life is short, Smile while you still have teeth!
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
                <Typography variant="h6" fontWeight="bold" gutterBottom >
                  Post a free job
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Post jobs for free.
                </Typography>
                <Button
                  component={Link}
                  to={'/apps/freejobpost'}
                  variant="contained"
                  color='primary'
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
