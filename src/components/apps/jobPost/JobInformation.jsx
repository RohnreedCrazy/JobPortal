import React from 'react';
import { Typography, Grid, TextField, MenuItem, FormControl, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  // Add other categories as needed
];

const Locations = [
  { value: 'new-york', label: 'New York, USA' },
  { value: 'los-angeles', label: 'Los Angeles, USA' },
  { value: 'chicago', label: 'Chicago, USA' },
  // Add other locations as needed
];

const JobInformation = ({ formData, errors, handleInputChange, setFormData }) => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Job information
      </Typography>
      <Grid container spacing={3} mb={4} mt={1}>
        {/* Job Title */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job title"
            placeholder="Enter job title"
            value={formData.jobTitle || ''}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            error={!!errors.jobTitle}
            helperText={errors.jobTitle}
          />
        </Grid>

        {/* Salary */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Salary"
            placeholder="5000"
            value={formData.salary || ''}
            onChange={(e) => handleInputChange('salary', e.target.value)}
            error={!!errors.salary}
            helperText={errors.salary}
          />
        </Grid>

        {/* Job Duration */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Job duration"
            placeholder="50"
            value={formData.jobDuration || ''}
            onChange={(e) => handleInputChange('jobDuration', e.target.value)}
            error={!!errors.jobDuration}
            helperText={errors.jobDuration}
          />
        </Grid>

        {/* Positions Available */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Positions available"
            placeholder=""
            value={formData.positionsAvailable || ''}
            onChange={(e) => handleInputChange('positionsAvailable', e.target.value)}
            error={!!errors.positionsAvailable}
            helperText={errors.positionsAvailable}
          />
        </Grid>

        {/* Maximum Number of Applicants */}
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            type="number"
            label="Maximum Number Of Applicants"
            placeholder=""
            value={formData.maxApplicants || ''}
            onChange={(e) => handleInputChange('maxApplicants', e.target.value)}
            error={!!errors.maxApplicants}
            helperText={errors.maxApplicants}
          />
        </Grid>

        {/* Job Categories */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.jobCategories}>
            <CustomFormLabel htmlFor="text-categories">Job Categories</CustomFormLabel>
            <CustomSelect
              id="text-categories"
              value={formData.jobCategories || ''}
              onChange={(e) => handleInputChange('jobCategories', e.target.value)}
            >
              {Categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
            {errors.jobCategories && <FormHelperText>{errors.jobCategories}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Job Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.jobType}>
            <CustomFormLabel htmlFor="demo-simple-select">Job Type</CustomFormLabel>
            <CustomSelect
              id="demo-simple-select"
              value={formData.jobType || ''}
              onChange={(e) => handleInputChange('jobType', e.target.value)}
            >
              <MenuItem value="full-time">Full-Time</MenuItem>
              <MenuItem value="part-time">Part-Time</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
            </CustomSelect>
            {errors.jobType && <FormHelperText>{errors.jobType}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Job Location */}
        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="text-location">Job location</CustomFormLabel>
          <TextField
            fullWidth
            label="Location"
            placeholder=""
            value={formData.jobLocation || ''}
            onChange={(e) => handleInputChange('jobLocation', e.target.value)}
            error={!!errors.jobLocation}
            helperText={errors.jobLocation}
          />
        </Grid>

        {/* Deadline */}
        <Grid item xs={12} lg={6} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth error={!!errors.deadline}>
              <CustomFormLabel htmlFor="deadline-date-picker">Application Deadline</CustomFormLabel>
              <MobileDateTimePicker
                value={formData.deadline || null}
                onChange={(date) => handleInputChange('deadline', date)}
                renderInput={(inputProps) => (
                  <CustomTextField fullWidth variant="outlined" size="medium" {...inputProps} />
                )}
              />
              {errors.deadline && <FormHelperText>{errors.deadline}</FormHelperText>}
            </FormControl>
          </LocalizationProvider>
        </Grid>

        {/* Job Description */}
        <Grid item xs={12}>
          <CustomFormLabel>Your Job Description</CustomFormLabel>
          <ReactQuill
            value={formData.discription || ''}
            onChange={(value) => setFormData((prev) => ({ ...prev, discription: value }))}
            placeholder="Please enter your job description"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JobInformation;
