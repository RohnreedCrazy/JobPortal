import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
import { IconBasket, IconMenu2 } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchjobs, addToCart } from '../../../../store/apps/FindJobs/FindJobsSlice';
import { IconCheck } from '@tabler/icons';
import AlertCart from '../jobCart/AlertCart';

const JobDetail = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const Id = useParams();

  // Get Job
  useEffect(() => {
    dispatch(fetchjobs());
  }, [dispatch]);

  // Get Jobs
  const job = useSelector((state) => state.FindJobsReducer.jobs[Id.id - 1]);

  /// select colors on click
  const [scolor, setScolor] = useState(job ? job.colors[0] : '');
  const setColor = (e) => {
    setScolor(e);
  };

  // for alert when added something to cart
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

  return (
    <Box p={2}>
      {job ? (
        <>
          <Box display="flex" alignItems="center">
            {/* ------------------------------------------- */}
            {/* Badge and category */}
            {/* ------------------------------------------- */}
            <Chip label="In Stock" color="success" size="small" />
            <Typography color="textSecondary" variant="caption" ml={1} textTransform="capitalize">
              {job.category}
            </Typography>
          </Box>
          {/* ------------------------------------------- */}
          {/* Title and description */}
          {/* ------------------------------------------- */}
          <Typography fontWeight="600" variant="h5" mt={1}>
            {job.title}
          </Typography>
          <Typography variant="subtitle2" mt={1} color={theme.palette.text.secondary}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex arcu, tincidunt bibendum
            felis.
          </Typography>
          {/* ------------------------------------------- */}
          {/* salary */}
          {/* ------------------------------------------- */}
          <Typography mt={2} variant="h6" fontWeight={600}>
            <Box
              component={'small'}
              color={theme.palette.text.secondary}
              sx={{ textDecoration: 'line-through' }}
            >
              ${job.salessalary}
            </Box>{' '}
            ${job.salary}
          </Typography>
          {/* ------------------------------------------- */}
          {/* Ratings */}
          {/* ------------------------------------------- */}
          <Stack direction={'row'} alignItems="center" gap="10px" mt={2} pb={3}>
            <Rating name="simple-controlled" size="small" value={job.rating} readOnly />
            <Link to="/" color="inherit">
              (236 reviews)
            </Link>
          </Stack>
          <Divider />         
          {/* ------------------------------------------- */}
          {/* Qty */}
          {/* ------------------------------------------- */}
          <Stack direction="row" alignItems="center" pb={2} py={2}>
            <Typography variant="body1" mr={4}>
              Location: Chicago
            </Typography>            
          </Stack>
          <Stack direction="row" alignItems="center" pb={2}>
            <Typography variant="body1" mr={4}>
              Duration: 20
            </Typography>           
          </Stack>
          <Stack direction="row" alignItems="center" pb={2}>
            <Typography variant="body1" mr={4}>
              Number of Applicants: 50
            </Typography>           
          </Stack>
          <Stack direction="row" alignItems="center" pb={2}>
            <Typography variant="body1" mr={4}>
              Date of Posting: 2024.12.25
            </Typography>           
          </Stack>
           {/* ------------------------------------------- */}
          {/* Colors */}
          {/* ------------------------------------------- */}
          <Stack py={2} direction="row" alignItems="center">
            <Typography variant="body1" mr={1}>
              Colors:
            </Typography>
            <Box>
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
            </Box>
          </Stack>
          <Divider />
          {/* ------------------------------------------- */}
          {/* Buttons */}
          {/* ------------------------------------------- */}
          <Grid container spacing={4} mt={3}>
            <Grid item xs={12} lg={2} md={4}>
              <Button
                color="primary"
                size="small"
                fullWidth
                component={Link}
                variant="contained"
                to="/apps/FindJobs/eco-checkout"
                onClick={() => dispatch(addToCart(job))}
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
          {/* ------------------------------------------- */}
          {/* Alert When click on add to cart */}
          {/* ------------------------------------------- */}
          <AlertCart handleClose={handleClose} openCartAlert={cartalert} />
        </>
      ) : (
        'No Jobs'
      )}
    </Box>
  );
};

export default JobDetail;
