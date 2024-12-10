import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// MUI Elements
import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  Rating,
  Divider,
  Stack,
  useTheme,
  Fab,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { fetchjobs, addToCart } from '../../../../store/apps/FindJobs/FindJobsSlice';
import { IconCheck } from '@tabler/icons';
import AlertCart from '../jobCart/AlertCart';
import { useNavigate } from "react-router-dom";

const JobDetail = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const id = useParams();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  // Fetch jobs from the store when the component mounts
  useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);

  // Select jobs from Redux store and filter by jobId
  const jobs = useSelector((state) => state.FindJobsReducer.jobs);
  const job = jobs.find((job) => job._id === id.id);

  /// select colors on click
  // const [scolor, setScolor] = useState(job ? job.colors[0] : '');
  // const setColor = (e) => {
  //   setScolor(e);
  // };

  // For alert when added something to cart
  const [cartalert, setCartalert] = React.useState(false);

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCartalert(false);
  };

  const applyconfirmAlert = (job_id) => {
    MySwal.fire({
      title: "Apply for this job?",
      text: "You can fill out the application now.",
      icon: "question",
      confirmButtonText: "Yeah",
      customClass: {
        confirmButton: `#224488` // Add CSS class
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/apps/jobApplication/${job_id}`);
      }
    });
  }

  return (
    <Box p={2}>
      {job ? (
        <>
          <Box display="flex" alignItems="center">
            {/* Badge and category */}
            <Chip label={job.jobCategories} color="success" size="small" />
          </Box>

          <Typography fontWeight="600" variant="h5" mt={1}>
            {job.jobTitle}
          </Typography>
          <Typography variant="subtitle2" mt={1} color={theme.palette.text.secondary}>
            I'd like to learn more about your skills and experience and help you find the perfect fit.
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Typography mt={2} variant="h6" fontWeight={600}>
              ${job.salary}
            </Typography>
            <Typography mt={2} variant="body1" fontWeight={600}>
              /monthly
            </Typography>
          </Box>
          <Stack direction={'row'} alignItems="center" gap="10px" mt={2} pb={3}>
            <Rating name="simple-controlled" size="small" value={job.rating} readOnly />
            <Link to="/" color="inherit">
              {`(${job.rating} reviews)`}
            </Link>
          </Stack>
          <Divider />

          {/* Location */}
          <Stack direction="row" alignItems="center" pb={2} py={2}>
            <Typography variant="body1" mr={4}>
              {`Location: ${job.jobLocation}`}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" pb={2}>
            <Typography variant="body1" mr={4}>
              {`Duration: ${job.jobDuration}`}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" pb={2}>
            <Typography variant="body1" mr={4}>
              {`Number of Applicants: ${job.activeApplications}`}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" pb={2}>
            <Typography variant="body1" mr={4}>
              {` Date of Posting: ${job.dateOfPosting}`}
            </Typography>
          </Stack>

          {/* Colors */}
          <Stack py={2} direction="row" alignItems="center">
            <Typography variant="body1" mr={1}>
              Colors:
            </Typography>
            {/* <Box>
              {job.colors.map((color) => (
                <Fab
                  color="primary"
                  sx={{
                    transition: '0.1s ease-in',
                    scale: scolor === color ? '0.9' : '0.7',
                    backgroundColor: `${color}`,
                    '&:hover': {
                      backgroundColor: `${color}`,
                      opacity: 0.7,
                    },
                  }}
                  size="small"
                  key={color}
                  onClick={() => setColor(color)}
                >
                  {scolor === color ? <IconCheck size="1.1rem" /> : ''}
                </Fab>
              ))}
            </Box> */}
          </Stack>
          <Divider />

          {/* Buttons */}
          <Grid container spacing={4} mt={3}>
            <Grid item xs={12} lg={2} md={4}>
              <Button
                color="primary"
                size="small"
                fullWidth
                variant="contained"
                onClick={() => applyconfirmAlert(id.id)}
              >
                Apply
              </Button>
            </Grid>
            <Grid item xs={12} lg={2} md={4}>
              <Button
                color="error"
                size="small"
                fullWidth
                variant="contained"
                onClick={() => dispatch(addToCart(job)) && handleClick()}
              >
                Save
              </Button>
            </Grid>
          </Grid>

          <Typography color="textSecondary" variant="body1" mt={4}>
            It will be forwarded to your employer shortly.
          </Typography>
          <Link to="/" color="inherit">
            Why the longer time for delivery?
          </Link>

          {/* Alert when click on add to cart */}
          <AlertCart handleClose={handleClose} openCartAlert={cartalert} />
        </>
      ) : (
        'No Jobs'
      )}
    </Box>
  );
};

export default JobDetail;
