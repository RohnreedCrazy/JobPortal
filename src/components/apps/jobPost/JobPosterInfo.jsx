import React from "react";
import { Typography, Grid, TextField } from "@mui/material";

const JobPosterInfo = ({ formData, errors, handleInputChange }) => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Job poster information
      </Typography>
      <Grid container spacing={3} mb={4} mt={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full name"
            placeholder="What's your name?"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            placeholder="What's your email address?"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JobPosterInfo;
