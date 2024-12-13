import React from 'react';
import {
  Grid,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
  Chip,
  Switch,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import PaymentModal from "./paymentModal";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Pricing',
  },
];

const Pricing = () => {
  const [show, setShow] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  // const yearlysalary = (a, b) => a * b;

  const handleBuyNowClick = () => {
    setOpenModal(true); // Open the modal when "Buy Now" is clicked
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <PageContainer title="Pricing" description="this is Pricing page">
      {/* breadcrumb */}
      <Breadcrumb title="Pricing" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3} justifyContent="center" mt={3}>
        <Grid item xs={12} sm={10} lg={8} textAlign="center">
          <Typography variant="h2" color="textPrimary">
            Flexible Plans Tailored to Fit Your Community's Unique Needs!
          </Typography>
          <Box display="flex" alignItems="center" mt={3} justifyContent="center">
            <Typography variant="subtitle1">Monthly</Typography>
            <Switch onChange={() => setShow(!show)} />
            <Typography variant="subtitle1">Yearly</Typography>
          </Box>
        </Grid>
      </Grid>

      {/*  Plan Cards */}
      <Grid container spacing={3} mt={5} justifyContent="center">
        {/* Plan Card free */}
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              p: 3,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {/* Plan Title */}
            <Typography
              variant="h6"
              fontWeight="600"
              color="text.primary"
              textTransform="capitalize"
            >
              Free Plan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Perfect for individuals exploring basic features
            </Typography>

            {/* Price Section */}
            <Typography
              variant="h3"
              fontWeight="700"
              sx={{ color: 'primary.main', display: 'inline-block', mb: 2 }}
            >
              ₹0.00
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Always free
            </Typography>

            {/* Button */}
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ mt: 6, py: 1.5, fontWeight: '600', borderRadius: '20px' }}
              disabled
            >
              Get Started for Free
            </Button>

            {/* Features List */}
            <Box mt={4} textAlign="left">
              <Typography variant="subtitle1" fontWeight="600" color="text.primary" mb={2}>
                Included essential features :
              </Typography>
              <List>
                {[
                  'Post 1 job at a time',
                  'Standard visibility for 15 days',
                  'Access to 1K+ resumes',
                  'Basic analytics dashboard',
                  'Limited notifications',
                  'Limited access to advanced search filters',
                ].map((feature, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon
                      sx={{
                        color: 'success.main',
                        minWidth: '32px',
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                    <ListItemText primary={feature} sx={{ color: 'text.primary' }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Modal for Free Plan Details */}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Free Plan Details</DialogTitle>
            <DialogContent>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Welcome to the Free Plan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enjoy basic features with no cost. Upgrade anytime for more benefits!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        {/*  Plan Card 1*/}
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              p: 3,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {/* Plan Title */}
            <Typography
              variant="h6"
              fontWeight="600"
              color="text.primary"
              textTransform="capitalize"
            >
              Premium Plan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              For recruiters and companies hiring top talent
            </Typography>

            {/* Price Section */}
            <Box mb={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textDecoration: 'line-through',
                  display: 'inline-block',
                  mr: 1,
                }}
              >
                ₹49.99
              </Typography>
              <Chip
                label="Save 50%"
                size="small"
                color="success"
                sx={{ fontWeight: '500', borderRadius: '4px' }}
              />
            </Box>

            <Typography
              variant="h3"
              fontWeight="700"
              sx={{ color: 'primary.main', display: 'inline-block' }}
            >
              ₹24.99
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              Per job post, billed monthly
            </Typography>

            {/* Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: '600', borderRadius: '20px' }}
              onClick={handleBuyNowClick}
            >
              Post a Job Now
            </Button>

            {/* Features List */}
            <Box mt={4} textAlign="left">
              <Typography variant="subtitle1" fontWeight="600" color="text.primary" mb={2}>
                Fit Your Community's Unique Needs!
              </Typography>
              <List>
                {[
                  'Post up to 5 jobs at a time',
                  'Boosted visibility for 30 days',
                  'Access to 10K+ resumes',
                  'Dedicated account manager',
                  'Candidate background verification',
                  'Unified admin & billing',
                ].map((feature, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon
                      sx={{
                        color: 'success.main',
                        minWidth: '32px',
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                    <ListItemText primary={feature} sx={{ color: 'text.primary' }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Modal for Payment */}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogContent>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Please enter your payment information
              </Typography>
              <Box mt={2}>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Card Type</InputLabel>
                  <Select label="Card Type" defaultValue="Visa">
                    <MenuItem value="Visa">Visa</MenuItem>
                    <MenuItem value="MasterCard">MasterCard</MenuItem>
                    <MenuItem value="American Express">American Express</MenuItem>
                  </Select>
                </FormControl>
                <TextField fullWidth label="Card Number" variant="outlined" sx={{ mb: 2 }} />
                <Box display="flex" gap={2}>
                  <TextField label="Expiration Date" variant="outlined" fullWidth />
                  <TextField label="CVV" variant="outlined" fullWidth />
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleCloseModal} color="primary">
                Submit Payment
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        {/* Plan Card 2 */}
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              textAlign: 'center',
              p: 3,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {/* Plan Title */}
            <Typography
              variant="h6"
              fontWeight="600"
              color="text.primary"
              textTransform="capitalize"
            >
              Professional Plan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Ideal for agencies managing multiple hiring campaigns
            </Typography>

            {/* Price Section */}
            <Box mb={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textDecoration: 'line-through',
                  display: 'inline-block',
                  mr: 1,
                }}
              >
                ₹99.99
              </Typography>
              <Chip
                label="Save 40%"
                size="small"
                color="success"
                sx={{ fontWeight: '500', borderRadius: '4px' }}
              />
            </Box>

            <Typography
              variant="h3"
              fontWeight="700"
              sx={{ color: 'primary.main', display: 'inline-block' }}
            >
              ₹59.99
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              Per month, billed annually
            </Typography>

            {/* Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: '600', borderRadius: '20px' }}
              onClick={handleBuyNowClick}
              disabled
            >
              Get Started
            </Button>

            {/* Features List */}
            <Box mt={4} textAlign="left">
              <Typography variant="subtitle1" fontWeight="600" color="text.primary" mb={2}>
                Maximize Hiring Efficiency!
              </Typography>
              <List>
                {[
                  'Post up to 15 jobs simultaneously',
                  'Priority visibility across platforms',
                  'Access to 50K+ premium resumes',
                  'Dedicated success consultant',
                  'Comprehensive analytics dashboard',
                  'Custom branded company profile',
                ].map((feature, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon
                      sx={{
                        color: 'success.main',
                        minWidth: '32px',
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                    <ListItemText primary={feature} sx={{ color: 'text.primary' }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Modal for Payment */}
          <PaymentModal openModal={openModal} handleCloseModal={handleCloseModal} />       
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Pricing;
