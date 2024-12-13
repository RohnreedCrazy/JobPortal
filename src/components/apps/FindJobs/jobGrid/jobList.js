import React, { useEffect, useState } from 'react';
import { filter, orderBy } from 'lodash';
import {
  Box,
  Grid,
  Stack,
  CardContent,
  useMediaQuery,
  Typography,
  Rating,
  Fab,
  Tooltip,
  Button,
  Skeleton,
  Pagination,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchjobs,
  addToCart,
  filterReset,
} from '../../../../store/apps/FindJobs/FindJobsSlice';
import JobSearch from './jobSearch';
import { useNavigate } from "react-router-dom";
import { IconBasket, IconMenu2 } from '@tabler/icons';
import AlertCart from '../jobCart/AlertCart';
import emptyCart from 'src/assets/images/jobs/empty-shopping-cart.png';
import BlankCard from '../../../shared/BlankCard';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Box textAlign="center"><Typography variant="h6">Something went wrong. Please try again later.</Typography></Box>;
    }
    return this.props.children;
  }
}

const JobList = ({ onClick }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);

  const getVisiblejob = (jobs, sortBy, filters, search) => {
    // Sorting
    if (sortBy === 'newest') jobs = orderBy(jobs, ['created'], ['desc']);
    if (sortBy === 'salaryDesc') jobs = orderBy(jobs, ['salary'], ['desc']);
    if (sortBy === 'salaryAsc') jobs = orderBy(jobs, ['salary'], ['asc']);
    if (sortBy === 'discount') jobs = orderBy(jobs, ['discount'], ['desc']);

    // Filtering
    if (filters.category !== 'All') jobs = jobs.filter((_job) => _job.jobCategories.includes(filters.category));
    if (filters.jobType !== 'All') jobs = filter(jobs, (_job) => _job.jobType === filters.jobType);
    if (filters.color !== 'All') jobs = jobs.filter((_job) => _job.colors.includes(filters.color));
    if (search !== '') jobs = jobs.filter((_job) => _job.jobTitle.toLowerCase().includes(search.toLowerCase()));
    if (filters.salary !== 'All') {
      const minMax = filters.salary ? filters.salary.split('-') : '';
      jobs = jobs.filter((_job) =>
        filters.salary ? _job.salary >= minMax[0] && _job.salary <= minMax[1] : true,
      );
    }

    return jobs;
  };

  const applyconfirmAlert = (job_id) => {
    MySwal.fire({
      title: "Apply for this job?",
      text: "You can fill out the application now.",
      icon: "question",
      confirmButtonText: "Yeah",
      customClass: {
        confirmButton: `#224488` // Add  CSS class
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/apps/jobApplication/${job_id}`);
      }
    });
  }

  const getjobs = useSelector((state) =>
    getVisiblejob(
      state.FindJobsReducer.jobs,
      state.FindJobsReducer.sortBy,
      state.FindJobsReducer.filters,
      state.FindJobsReducer.jobSearch,
    ),
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(12);

  // Calculate current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = getjobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Cart alert
  const [cartalert, setCartalert] = useState(false);

  const handleClick = () => setCartalert(true);
  const handleClose = (reason) => {
    if (reason === 'clickaway') return;
    setCartalert(false);
  };

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">Job list</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          <JobSearch />
        </Box>
      </Stack>

      {/* Job Listing */}
      <Grid container spacing={3}>
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <Grid item xs={12} lg={4} md={4} sm={6} key={job._id}>
              <BlankCard className="hoverCard" sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                <Typography
                  component={Link}
                  to={`/apps/FindJobs/detail/${job._id}`}
                  sx={{ display: 'block', textDecoration: 'none' }}
                >
                  {isLoading || !job.companyLogo ? (
                    <Skeleton variant="rectangular" width="100%" height={200} />
                  ) : (
                    <Box
                      component="img"
                      src={job.companyLogo}
                      alt={job.jobTitle}
                      sx={{
                        marginTop: '10px',
                        width: '40%',
                        height: 100,
                        objectFit: 'fill',
                        borderRadius: '10px',
                      }} 
                    />
                  )}
                </Typography>
                <Tooltip title="Add To Cart">
                  <Fab
                    size="small"
                    color="primary"
                    onClick={() => {
                      dispatch(addToCart(job));
                      handleClick();
                    }}
                    sx={{
                      top: '10px',
                      right: '10px',
                      position: 'absolute',
                      transition: 'all 0.3s ease',
                      ':hover': { transform: 'scale(1.1)' },
                    }}
                  >
                    <IconBasket size="16" />
                  </Fab>
                </Tooltip>
                <Tooltip title="Apply Now">
                  <Fab
                    size="small"
                    color="secondary"
                    onClick={() => {
                      applyconfirmAlert(job._id);
                    }}
                    sx={{
                      top: '50px',
                      right: '10px',
                      position: 'absolute',
                      transition: 'all 0.3s ease',
                      ':hover': { transform: 'scale(1.1)' },
                    }}
                  >
                    <DoneIcon size="12" />
                  </Fab>
                </Tooltip>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {job.jobTitle}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="baseline">
                      <Typography variant="h6" color="primary">
                        ${job.salary}
                      </Typography>
                    </Stack>
                    <Rating name="read-only" size="small" value={job.rating} readOnly />
                  </Stack>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop:2 }}>
                    <Typography variant="body2" color="textSecondary">
                      Category : {job.jobCategories}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      JobType : {job.jobType}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Skills : {job.skillsets}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Location : {job.jobLocation}
                    </Typography>
                  </Box>
                </CardContent>
              </BlankCard>
              <AlertCart handleClose={handleClose} openCartAlert={cartalert} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box textAlign="center" mt={6}>
              <img src={emptyCart} alt="cart" width="200px" />
              <Typography variant="h2">There is no job</Typography>
              <Typography variant="h6" mb={3}>
                The Job you are searching is no longer available.
              </Typography>
              <Button variant="contained" onClick={() => dispatch(filterReset())}>
                Try Again
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Pagination */}
      <Stack direction="row" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(getjobs.length / jobsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="medium"
        />
      </Stack>
    </Box>
  );
};

// Wrap the JobList with the ErrorBoundary
const JobListWithErrorBoundary = () => (
  <ErrorBoundary>
    <JobList />
  </ErrorBoundary>
);

export default JobListWithErrorBoundary;
