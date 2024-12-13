import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'src/utils/axios';
import { toast } from 'react-toastify';
import { load } from '@cashfreepayments/cashfree-js';

let cashfree;
var initializeSDK = async function () {
  cashfree = await load({
    mode: 'sandbox',
  });
};
initializeSDK();

const PaymentModal = ({ openModal, handleCloseModal }) => {

    const [isSubmitting, setIsSubmitting] = React.useState(false);
  // Validation schema with Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    price: Yup.string().required('Price is required'),
    currency: Yup.string().required('Currency is required'),
  });

  const verifyPayment = async (verifydata) => {
    try {
      const response = await axios.post(`/api/payment/verifypayment`, {
        orderId: verifydata,
      });
      const paymentStatus = response.data.map((item) => item.payment_status);

      if (paymentStatus[0] === 'SUCCESS') {
        toast.success('Payment verified successfully!');
        handleCloseModal();
      } else {
        toast.error('Payment verification failed!');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      toast.warn('Unable to verify payment. Please try again.');
    }
  };

  // Submit handler
  const handleSubmit = async (values) => {
    setIsSubmitting(true);  // Set loading state to true
    try {
      const { data } = await axios.post(`/api/payment/createOrder`, values);

      if (!data || !data.payment_session_id || !data.orderId) {
        throw new Error('Invalid payment session data');
      }

      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_modal',
      };
      const result = await cashfree.checkout(checkoutOptions);

      if (result.error) {
        toast.error(
          'User has closed the popup or there is some payment error, Check for Payment Status',
        );
      } else if (result.redirect) {
        // If the payment will be redirected
        toast.warn('Payment will be redirected');
        await verifyPayment(data.orderId);
      } else if (result.paymentDetails) {
        // If payment is completed, verify the payment status
        toast.success('Payment has been completed successfully.');
        await verifyPayment(data.orderId);
      } else {
        // In case the result is not expected
        toast.error('Unexpected result from Cashfree checkout.');
      }
    } catch (err) {
      // Handle any errors that occur during the process
      console.error('Error occurred during payment processing:', err);
      toast.error('Error submitting payment. Please try again.');
    } finally {
        setIsSubmitting(false);  // Reset loading state
    }
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6" color="text.primary" gutterBottom>
          Secure your Professional Plan
        </Typography>
        <Box mt={2}>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '9090407368',
              price: '24.99',
              currency: 'INR',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                {/* Name and Email Fields */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="fullName"
                      as={TextField}
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      error={touched.fullName && Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="email"
                      as={TextField}
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>

                {/* Phone Field */}
                <Field
                  name="phoneNumber"
                  as={TextField}
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ mb: 2 }}
                />

                {/* Price and Currency Select */}
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="price"
                      as={TextField}
                      fullWidth
                      label="Price"
                      variant="outlined"
                      value="24.99"
                      sx={{ mb: 2 }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                      <InputLabel>Currency</InputLabel>
                      <Field name="currency" as={Select} label="Currency">
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="INR">INR</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>
                </Grid>

                <DialogActions>
                  <Button onClick={handleCloseModal} color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Submit Payment'
                    )}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
