import React from 'react';
import { Grid, Typography, Container } from '@mui/material';

import logoIcon from 'src/assets/images/logos/logo.svg';

const Footer = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center" mt={4}>
        <Grid item xs={12} sm={5} lg={4} textAlign="center">
          <img src={logoIcon} alt="icon" />
          <Typography fontSize="16" color="textSecondary" mt={1} mb={4}>
            © All Rights Reserved by Minerva - Trusted Connections
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
