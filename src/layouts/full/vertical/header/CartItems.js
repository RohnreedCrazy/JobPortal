import React from 'react';
import { Box, Typography, Avatar, Stack, ButtonGroup, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import emptyCart from 'src/assets/images/products/empty-shopping-cart.png';

const CartItems = () => {

  // Get Products
  const Cartjobs = useSelector((state) => state.FindjobsReducer.cart);

  return (
    <Box px={3}>
      {Cartjobs.length > 0 ? (
        <>
          {Cartjobs.map((job, index) => (
            <Box key={job._id + index * index}>
              <Stack direction="row" spacing={2} py={3}>
                <Avatar
                  src={job.companyLogo}
                  alt={job.photo}
                  sx={{
                    borderRadius: '10px',
                    height: '75px',
                    width: '95px',
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" color="textPrimary" fontWeight="500">
                    {job.jobTitle}
                  </Typography>{' '}
                  <Typography color="textSecondary" variant="body1">
                    {' '}
                    {job.jobCategories}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} mt="5px">
                    <Typography variant="subtitle2" color="textSecondary">
                      ${job.salary * job.qty}
                    </Typography>
                    <ButtonGroup size="small" color="success" aria-label="small button group">

                    </ButtonGroup>
                  </Stack>
                </Box>
              </Stack>
              <Divider />
            </Box>
          ))}
        </>
      ) : (
        <Box textAlign="center" mb={3}>
          <img src={emptyCart} alt="cart" width="200px" />
          <Typography variant="h5" mb={2}>
            Cart is Empty
          </Typography>
          <Button component={Link} to="/apps/Findjobs/shop" variant="contained">
            Go back to JobSearching
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartItems;
