import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  ButtonGroup,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import emptyCart from 'src/assets/images/jobs/empty-shopping-cart.png';
import { deleteCart, } from '../../../../store/apps/FindJobs/FindJobsSlice';

const AddToCart = () => {
  const dispatch = useDispatch();

  // Get jobs
  const Cartjob = useSelector((state) => state.FindJobsReducer.cart);
  console.log(Cartjob);

  return (
    <Box>
      {Cartjob.length > 0 ? (
        <>
          <Box>
            <TableContainer sx={{ minWidth: { sm: '350px' } }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>job</TableCell>

                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="right">salary</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Cartjob.map((job) => (
                    <TableRow key={job.id}>
                      {/* ------------------------------------------- */}
                      {/* job Image & Title */}
                      {/* ------------------------------------------- */}
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Avatar
                            src={job.photo}
                            alt={job.photo}
                            sx={{
                              borderRadius: '10px',
                              height: '80px',
                              width: '90px',
                            }}
                          />
                          <Box>
                            <Typography variant="h6">{job.title}</Typography>{' '}
                            <Typography color="textSecondary" variant="body1">
                              {job.category}
                            </Typography>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => dispatch(deleteCart(job.id))}
                            >
                              <IconTrash size="1rem" />
                            </IconButton>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <ButtonGroup size="small" color="success" aria-label="small button group">
                          <Button onClick={``} disabled={``}>
                            <IconMinus stroke={1.5} size="0.8rem" />
                          </Button>
                          <Button>{job.qty}</Button>
                          <Button onClick={``} disabled={``}>
                            <IconPlus stroke={1.5} size="0.8rem" />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6">${job.salary * job.qty}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      ) : (
        <Box textAlign="center" mb={3}>
          <img src={emptyCart} alt="cart" width="200px" />
          <Typography variant="h5" mb={2}>
            Cart is Empty
          </Typography>
          <Button component={Link} to="/apps/FindJobs/shop" variant="contained">
            Go back to Shopping
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddToCart;
