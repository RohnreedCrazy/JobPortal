import React from 'react';
import {
  Grid,
  Typography,
  Box,
  ListItem,
  ListItemText,
  Button,
  CardContent,
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
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';

import { IconCheck, IconX } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';

import pck1 from 'src/assets/images/backgrounds/silver.png';
import pck2 from 'src/assets/images/backgrounds/bronze.png';
import pck3 from 'src/assets/images/backgrounds/gold.png';

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

  const yearlysalary = (a, b) => a * b;

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;  // Primary color
  const secondaryColor = theme.palette.secondary.main;  // Secondary color
  const textPrimaryColor = theme.palette.primary.contrastText;  // Text color for good contrast
  const secondaryTextColor = theme.palette.text.secondary;  // For secondary text
  const warninglight = theme.palette.warning.light;
  const warning = theme.palette.warning.main;

  const StyledChip = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: '15px',
    right: '30px',
    backgroundColor: warninglight,
    color: warning,
    textTransform: 'uppercase',
    fontSize: '11px',
  }));

  // Define card wrapper with background colors based on plan
  const CardWrapper = styled(Box)(({ theme, backgroundColor }) => ({
    backgroundColor: backgroundColor, // Set background color based on plan
    borderRadius: '16px',
    padding: '24px',
    boxShadow: theme.shadows[4],
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[10],
    },
    color: textPrimaryColor, // Set text color to primary contrast text
  }));

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

      {/* Silver Plan Card */}
      <Grid container spacing={3} mt={5} justifyContent="center">
        <Grid item xs={12} sm={6} lg={4}>
          <CardWrapper backgroundColor={'#fafafa'}>
            <CardContent sx={{ p: 3 }}>
              {/* Title "Silver Plan" */}
              <Typography
                variant="subtitle1"
                fontSize="14px"
                mb={3}
                color="text.primary" // Use text.primary for the title
                textTransform="uppercase"
                fontWeight="600"
              >
                {/* Silver Plan */}
              </Typography>

              {/* Plan Image */}
              <img src={pck1} alt="Silver Plan" width={90} />

              {/* Pricing Box */}
              <Box my={4} display="flex" alignItems="center">
                <Typography variant="h1" fontWeight="600" color="text.primary">
                  Free
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary" // Use text.secondary for the "/mo" part (lighter text)
                  fontWeight={400}
                  ml={1}
                  mt={1}
                >
                  /mo
                </Typography>
              </Box>

              {/* Features List */}
              <Box mt={3}>
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="5-10 candidates" sx={{ color: 'text.primary' }} />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="No Featured Badge" sx={{ color: 'text.primary' }} />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Slow Approval" sx={{ color: 'text.primary' }} />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Published for 10 days" sx={{ color: 'text.primary' }} />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="No Verified Company" sx={{ color: 'text.primary' }} />
                  </ListItem>
                </List>
              </Box>

              {/* Choose Button */}
              <Button
                sx={{ width: '100%', mt: 3 }}
                variant="contained"
                size="large"
                color="secondary"
                disabled
              >
                Buy now
              </Button>
            </CardContent>
          </CardWrapper>
        </Grid>

        {/* Bronze Plan Card */}
        <Grid item xs={12} sm={6} lg={4}>
          <CardWrapper backgroundColor={'primary.main'}> {/* Using primary color for background */}
            <CardContent sx={{ p: 3 }}>
              {/* Popular Badge */}
              <StyledChip label="Popular" size="small" sx={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10 }} />

              {/* Plan Title */}
              <Typography
                variant="subtitle1"
                fontSize="14px"
                mb={3}
                color="text.primary"  // Use text.primary for better visibility
                textTransform="uppercase"
                fontWeight="600"
              >
                {/* Bronze Plan */}
              </Typography>

              {/* Plan Image */}
              <img src={pck2} alt="Bronze Plan" width={90} />

              {/* Pricing Section */}
              <Box my={4}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h4" fontWeight="600">
                    ₹
                  </Typography>
                  {show ? (
                    <>
                      <Typography variant="h1" fontWeight="600">
                        {yearlysalary(20, 12)}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight={400}
                        color="text.secondary"
                        ml={1}
                        mt={1}
                      >
                        /yr
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h1" fontWeight="600">
                        20
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight={400}
                        color="text.secondary"
                        ml={1}
                        mt={1}
                      >
                        /mo
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>

              {/* Features List */}
              <Box mt={3}>
                <List>
                  {/* Enabled List Items */}
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'text.disabled', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="25-50+ candidates" sx={{ color: 'text.primary' }} />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'text.disabled', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Featured Badge" sx={{ color: 'text.primary' }} />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'text.disabled', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Instant Approval" sx={{ color: 'text.primary' }} />
                  </ListItem>

                  {/* Disabled List Items */}
                  <ListItem disableGutters sx={{ color: 'text.disabled' }}>
                    <ListItemIcon sx={{ color: 'text.disabled', minWidth: '32px' }}>
                      <IconX width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Published for 20 days" />
                  </ListItem>
                  <ListItem disableGutters sx={{ color: 'text.disabled' }}>
                    <ListItemIcon sx={{ color: 'text.disabled', minWidth: '32px' }}>
                      <IconX width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Verified Company Page" />
                  </ListItem>
                </List>
              </Box>

              {/* Buy now Button */}
              <Button
                sx={{ width: '100%', mt: 3 }}
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleBuyNowClick}
              >
                Buy now
              </Button>
            </CardContent>
          </CardWrapper>


          {/* Modal for Payment */}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogContent>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Please enter your payment information
              </Typography>

              {/* Payment Form */}
              <Box mt={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Card Type</InputLabel>
                  <Select label="Card Type" defaultValue="Visa">
                    <MenuItem value="Visa">Visa</MenuItem>
                    <MenuItem value="MasterCard">MasterCard</MenuItem>
                    <MenuItem value="American Express">American Express</MenuItem>
                  </Select>
                </FormControl>

                <TextField fullWidth label="Card Number" variant="outlined" sx={{ mt: 2 }} />
                <Box display="flex" mt={2} justifyContent="space-between">
                  <TextField label="Expiration Date" variant="outlined" sx={{ width: '48%' }} />
                  <TextField label="CVV" variant="outlined" sx={{ width: '48%' }} />
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


        {/* Gold Plan Card */}
        <Grid item xs={12} sm={6} lg={4}>
          <CardWrapper backgroundColor={secondaryColor}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="subtitle1"
                fontSize="14px"
                mb={3}
                color="textSecondary"
                textTransform="uppercase"
                fontWeight="600"
              >
                {/* Gold Plan */}
              </Typography>
              <img src={pck3} alt="Gold Plan" width={90} />
              <Box my={4}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h4" fontWeight="600">
                    ₹
                  </Typography>
                  {show ? (
                    <>
                      <Typography variant="h1" fontWeight="600">
                        {yearlysalary(40, 12)}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight={400}
                        color={secondaryTextColor}
                        ml={1}
                        mt={1}
                      >
                        /yr
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h1" fontWeight="600">
                        40.99
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight={400}
                        color={secondaryTextColor}
                        ml={1}
                        mt={1}
                      >
                        /mo
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>

              <Box mt={3}>
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Unlimited candidates" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Featured Badge" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Instant Approval" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Published for 20 days" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                      <IconCheck width={18} />
                    </ListItemIcon>
                    <ListItemText primary="Permissions & workflows" />
                  </ListItem>
                </List>
              </Box>

              <Button
                sx={{ width: '100%', mt: 3 }}
                disabled
                variant="contained"
                size="large"
                color="primary"
              >
                Buy now
              </Button>
            </CardContent>
          </CardWrapper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Pricing;
