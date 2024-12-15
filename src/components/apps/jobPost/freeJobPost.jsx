import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
import axios from 'src/utils/axios';
import { useDispatch } from 'react-redux';
import { postJob } from '../../../store/apps/FindJobs/FindJobsSlice';

import JobPosterInfo from './JobPosterInfo';
import JobInformation from './JobInformation';
import CompanyInformation from './CompanyInformation';
import AlertComponent from 'src/components/alert/alert';
import { toast } from 'react-toastify';

const PostJobForm = () => {
  const dispatch = useDispatch();
  
  //get loginedUser's info from local storage
  const loginedUser = JSON.parse(localStorage.getItem('user')) || {};

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [msgtype, setMsgtype] = useState('');

  const [formData, setFormData] = React.useState({
    id: loginedUser._id,
    fullName: '',
    email: '',
    jobTitle: '',
    jobCategories: '',
    jobType: '',
    salary: '',
    jobLocation: '',
    jobDuration: '',
    discription: '',
    deadline: ``,
    positionsAvailable: '',
    maxApplicants: '',
    companyCover: '',
    companyLogo: '',
    contactNumber: '',
    companyName: '',
    companyWebsite: '',
    companyIndustry: '',
    companySize: '',
    companyDescription: '',
    companyPerks: '',
  });

  const [logoPreview, setLogoPreview] = React.useState(null);
  const [coverPreview, setCoverPreview] = React.useState(null);
  const [imagefile, setImagefile] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (field, value) => {
    // Convert salary to number if it's a string
    if (field === 'salary') {
      value = parseFloat(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Clear previous errors
    setErrors({});

    // Required field validations
    if (!formData.fullName) newErrors.fullName = 'Full name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email format is invalid.';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required.';
    if (!formData.jobCategories) newErrors.jobCategories = 'Job categories are required.';
    if (!formData.jobType) newErrors.jobType = 'Job type is required.';
    if (!formData.jobLocation) newErrors.jobLocation = 'Job location is required.';
    if (!formData.jobDuration) newErrors.jobDuration = 'Job duration is required.';
    if (!formData.discription) newErrors.discription = 'Job description is required.';
    if (!formData.salary) newErrors.salary = 'Salary is required.';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required.';
    if (!formData.positionsAvailable)
      newErrors.positionsAvailable = 'Positions available is required.';
    if (!formData.maxApplicants)
      newErrors.maxApplicants = 'Maximum number of applicants is required.';
    if (!formData.companyName) newErrors.companyName = 'Company name is required.';
    if (!formData.companyWebsite) newErrors.companyWebsite = 'Company website is required.';
    else if (!/^https?:\/\/.+\..+$/.test(formData.companyWebsite))
      newErrors.companyWebsite = 'Enter a valid website URL.';
    if (!formData.companyIndustry) newErrors.companyIndustry = 'Company industry is required.';
    if (!formData.companySize) newErrors.companySize = 'Company size is required.';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required.';
    if (!formData.companyDescription)
      newErrors.companyDescription = 'Company description is required.';
    if (!formData.companyPerks) newErrors.companyPerks = 'Company perks and benefits are required.';

    // Logo and cover validation
    if (!logoPreview) newErrors.logo = 'Company logo is required.';
    if (!coverPreview) newErrors.cover = 'Company cover is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // File change handler
  const handlelogoFileChange = (event) => {
    const file = event.target.files[0];
    setImagefile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
    // console.log("Selected file: ", file);
  };
  const handlecoverFileChange = (event) => {
    const file = event.target.files[0];
    setImagefile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
    // console.log("Selected file: ", file);
  };

  const handleRemoveImage = (setPreview) => setPreview(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    const isFormValid = validateForm();
    if (!isFormValid) {
      toast.error('Form validation failed.');
      // console.log(`this is submited data:`, formData);
      return;
    }

    if (!formData.companyLogo) {
      toast.error('Please upload a company logo before submitting.');
      return;
    }

    try {
      dispatch(postJob(formData));
      // Clear form data and related states
      setFormData({
        id: loginedUser._id,
        fullName: '',
        email: '',
        jobTitle: '',
        jobCategories: '',
        jobType: '',
        salary: '',
        jobLocation: '',
        jobDuration: '',
        discription: '',
        deadline: ``,
        positionsAvailable: '',
        maxApplicants: '',
        companyCover: '',
        companyLogo: '',
        contactNumber: '',
        companyName: '',
        companyWebsite: '',
        companyIndustry: '',
        companySize: '',
        companyDescription: '',
        companyPerks: '',
      });
      setLogoPreview(null);
      setCoverPreview(null);
      setImagefile(null);
      setErrors({});

    } catch (error) {
      toast.error('There was an issue submitting your job post. Please try again');
    }
  };

  // Upload function for logo
  const uploadLogoToServer = async () => {
    if (!imagefile) {
      setText('Please select a logo first!');
      setOpen(true);
      setMsgtype('warning');
      return;
    }

    const formData = new FormData();
    formData.append('image', imagefile);

    try {
      const response = await axios.post('/api/upload/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploadedLogoPath = response.data.filePath;
      setFormData((prev) => ({ ...prev, companyLogo: uploadedLogoPath }));
      setText('Logo uploaded successfully!');
      setOpen(true);
      setMsgtype('success');
    } catch (error) {
      setText('Error uploading logo!');
      setOpen(true);
      setMsgtype('error');
    }
  };
  // Upload function for cover
  const uploadCoverToServer = async () => {
    if (!imagefile) {
      setText('Please select a cover first!');
      setOpen(true);
      setMsgtype('warning');
      return;
    }

    const formData = new FormData();
    formData.append('image', imagefile);

    try {
      const response = await axios.post('/api/upload/cover', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setText('Cover uploaded successfully!');
      setOpen(true);
      setMsgtype('success');
      setFormData((prev) => ({ ...prev, companyCover: response.data.filePath }));
      // console.log('Uploaded Logo URL:', response.data.filePath);
    } catch (error) {
      // console.error("Error uploading logo:", error);

      setText('Error uploading Cover!');
      setOpen(true);
      setMsgtype('error');
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: 'auto' }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Post a job today
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Get access to millions of job seekers and recruit the right talent to accelerate growth.
        </Typography>
      </Box>

      {/* Form */}
      <Box
        component="form"
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Job Poster Information */}
        <JobPosterInfo formData={formData} errors={errors} handleInputChange={handleInputChange} />

        {/* Job Information */}
        <JobInformation
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
        />

        {/* Company Information */}
        <CompanyInformation
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          logoPreview={logoPreview}
          coverPreview={coverPreview}
          handlecoverFileChange={handlecoverFileChange}
          handlelogoFileChange={handlelogoFileChange}
          handleRemoveImage={handleRemoveImage}
          uploadLogoToServer={uploadLogoToServer}
          uploadCoverToServer={uploadCoverToServer}
          setLogoPreview={setLogoPreview}
          setCoverPreview={setCoverPreview}
        />

        {/* Featured Job */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Featured job
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12}>
            <TextField fullWidth label="Order ID" placeholder="Insert your order ID" />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button onClick={handleSubmit} variant="contained">
          Submit for approval
        </Button>
      </Box>
      <AlertComponent open={open} handleClose={handleClose} text={text} type={msgtype} />
    </Box>
  );
};

export default PostJobForm;
