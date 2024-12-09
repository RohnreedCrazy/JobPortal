import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, CardContent, Grid, Rating, Skeleton, Fab, Tooltip, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchjobs, addToCart } from '../../../../store/apps/FindJobs/FindJobsSlice';
import AlertCart from '../jobCart/AlertCart';
import { Link } from 'react-router-dom';
import BlankCard from '../../../shared/BlankCard';
import DoneIcon from '@mui/icons-material/Done';
import { IconBasket } from '@tabler/icons';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const JobRelated = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // State for Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // Number of jobs to display per page

  // Get job
  React.useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);

  const filterRelatedjob = (jobs) => {
    if (jobs) return jobs.filter((t) => t.related);
    return jobs;
  };

  // Get Jobs
  const Relatedjobs = useSelector((state) =>
    filterRelatedjob(state.FindJobsReducer.jobs),
  );
  const [isLoading, setLoading] = React.useState(true);

  // Cart alert
  const [cartalert, setCartalert] = React.useState(false);

  const handleClick = () => setCartalert(true);
  const handleClose = (reason) => {
    if (reason === 'clickaway') return;
    setCartalert(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Slice the Relatedjobs array based on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const jobsToDisplay = Relatedjobs.slice(startIndex, endIndex);

  return (
    <Box>
      <Typography variant="h4" mb={2} mt={5}>
        Related Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobsToDisplay.map((job) => (
          <Grid item xs={12} lg={3} sm={4} display="flex" alignItems="stretch" key={job.title}>
            <BlankCard className="hoverCard" sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
              <Typography
                component={Link}
                to={`/apps/FindJobs/detail/${job.id}`}
                sx={{ display: 'block', textDecoration: 'none' }}
              >
                {isLoading || !job.photo ? (
                  <Skeleton variant="rectangular" width="100%" height={200} />
                ) : (
                  <Box
                    component="img"
                    src={job.photo}
                    alt={job.title}
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
                  onClick={ ()=>{ applyconfirmAlert(job.id); }}
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
                  {job.title}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="baseline">
                    <Typography variant="h6" color="primary">
                      ${job.salary}
                    </Typography>
                  </Stack>
                  <Rating name="read-only" size="small" value={job.rating} readOnly />
                </Stack>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  Location : {job.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  xs = {{marginTop:'5px'}}
                >
                  Skills : ${job.salessalary}
                </Typography>
              </CardContent>
            </BlankCard>
            <AlertCart handleClose={handleClose} openCartAlert={cartalert} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Stack spacing={2} mt={3} alignItems="center">
        <Pagination
          count={Math.ceil(Relatedjobs.length / itemsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default JobRelated;
