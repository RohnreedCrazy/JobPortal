import React from 'react';
import { Grid, Typography, Box, Button, styled, Container, Stack } from '@mui/material';

import phoneimg from 'src/assets/images/landingpage/background/phoneImg.webp';
import GuaranteeCard from './GuaranteeCard';
import AppleIcon from 'src/assets/images/landingpage/Apple_Store _Badge.png';
import GoogleIcon from 'src/assets/images/landingpage/Google_Store_Badge.png';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const StyledButton2 = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  borderColor: theme.palette.background.paper,
  color: theme.palette.background.paper,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));

const C2a2 = () => {
  return (
    <Box>
      <Box
        bgcolor="primary.main"
        sx={{
          pt: '60px',
          pb: '30px',
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item xs={12} sm={12} lg={5}>
              <Typography variant="h2" color="background.paper" fontWeight={700} mt={4}>
                Download on your phone, manage jobs anywhere,{' '}
                <Typography variant="h1" component="span" color="background.paper">
                  anytime
                </Typography>
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 4 }} // Adjust spacing for responsiveness
                alignItems="center"
                justifyContent="center"
                mt={4}
              >
                {/* App Store Button */}
                <a href="https://apps.apple.com/" target="_blank" rel="noopener noreferrer">
                  <Box
                    component="img"
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    sx={{
                      width: { xs: 130, sm: 160, md:180, lg:180 }, 
                      height: 'auto',
                    }}
                  />
                </a>

                {/* Google Play Button */}
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                  <Box
                    component="img"
                    src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    sx={{
                      width: { xs: 160, sm: 190,  md:220, lg:220 },  
                      height: 'auto',
                    }}
                  />
                </a>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Box
                sx={{
                  textAlign: {
                    xs: 'center',
                    lg: 'right',
                  },
                }}
              >
                <img src={phoneimg} alt="img" width="230" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* <Container maxWidth="lg">
        <GuaranteeCard />
      </Container> */}
    </Box>
  );
};

export default C2a2;
