import React from 'react';
import { Grid, Typography, Stack, Box } from '@mui/material';
import AnimationFadeIn from '../animation/Animation';
// images
import img1 from 'src/assets/images/landingpage/trusted/curb_bw.png';
import img2 from 'src/assets/images/landingpage/trusted/depict_bw.png';
import img3 from 'src/assets/images/landingpage/trusted/volta_bw.png';

const DemoTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={10} lg={10}>
        <AnimationFadeIn>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems="center"
            justifyContent="center"
            mb={2}
            gap={4}
          >
            <Typography variant="h3" color="textSecondary">
              Trusted by leading companies
            </Typography>
            <Box
              component="img"
              alt="curb_bw"
              src={img1}
              sx={{
                width: 50,
                height: 50,
                // borderRadius: '50%', // Optional: To keep the rounded look like Avatar
                objectFit: 'cover', // Ensures the image scales correctly
              }}
            />
            <Box
              component="img"
              alt="depict_bw"
              src={img2}
              sx={{
                width: 120,
                height: 50,
                // borderRadius: '50%',
                objectFit: 'fill',
              }}
            />
            <Box
              component="img"
              alt="volta_bw"
              src={img3}
              sx={{
                width: 120,
                height: 50,
                borderRadius: '50%',
                objectFit: 'fill',
              }}
            />
          </Stack>
          <Typography
            variant="h2"
            fontWeight={700}
            textAlign="center"
            sx={{
              fontSize: {
                lg: '36px',
                xs: '25px',
              },
              lineHeight: {
                lg: '43px',
                xs: '30px',
              },
            }}
          >
            Testimonials
          </Typography>
        </AnimationFadeIn>
      </Grid>
    </Grid>
  );
};

export default DemoTitle;
