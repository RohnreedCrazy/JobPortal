import React from "react";
import { Typography, Grid, TextField, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ReactQuill from "react-quill";

const JobInformation = ({ formData, errors, handleInputChange, setFormData }) => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Job information
      </Typography>
      <Grid container spacing={3} mb={4} mt={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job title"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            error={!!errors.jobTitle}
            helperText={errors.jobTitle}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job categories"
            placeholder="Development"
            value={formData.jobCategories}
            onChange={(e) => handleInputChange("jobCategories", e.target.value)}
            error={!!errors.jobCategories}
            helperText={errors.jobCategories}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomSelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.jobType}  // The value here should be a string ("Full-Time")
            onChange={(e) => handleInputChange("jobType", e.target.value)}
            fullWidth
            error={!!errors.jobType}
            helperText={errors.jobType}
          >
            <MenuItem value="Full-Time">Full-Time</MenuItem>  {/* Match value with string */}
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </CustomSelect>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job location"
            placeholder="San Francisco"
            value={formData.jobLocation}
            onChange={(e) => handleInputChange("jobLocation", e.target.value)}
            error={!!errors.jobLocation}
            helperText={errors.jobLocation}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job duration"
            placeholder="50"
            value={formData.jobDuration}
            onChange={(e) => handleInputChange("jobDuration", e.target.value)}
            error={!!errors.jobDuration}
            helperText={errors.jobDuration}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Salary"
            placeholder="5000"
            value={formData.salary}
            onChange={(e) => handleInputChange("salary", e.target.value)}
            error={!!errors.salary}
            helperText={errors.salary}
          />
        </Grid>
        <Grid item xs={12} lg={6} sm={6} display="flex" alignItems="stretch">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              value={formData.deadline}
              onChange={(date) => handleInputChange("deadline", date)}
              renderInput={(inputProps) => (
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  inputProps={{ "aria-label": "deadline date-picker" }}
                  {...inputProps}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Positions available"
            placeholder=""
            value={formData.positionsAvailable}
            onChange={(e) =>
              handleInputChange("positionsAvailable", e.target.value)
            }
            error={!!errors.positionsAvailable}
            helperText={errors.positionsAvailable}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Maximum Number Of Applicants"
            placeholder=""
            value={formData.maxApplicants}
            onChange={(e) =>
              handleInputChange("maxApplicants", e.target.value)
            }
            error={!!errors.maxApplicants}
            helperText={errors.maxApplicants}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel>Your Job description</CustomFormLabel>
          <ReactQuill
            value={formData.discription}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, discription: value }))
            }
            placeholder="Please enter your job description"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JobInformation;
