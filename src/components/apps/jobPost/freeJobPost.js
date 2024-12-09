import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Quill.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const PostJobForm = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    jobTitle: "",
    jobCategories: "",
    jobType: "",
    jobLocation: "",
    jobDuration: "",
    discription: "",
    deadline: null,
    positionsAvailable: "",
    maxApplicants: "",
    companyName: "",
    companyWebsite: "",
    companyIndustry: "",
    companySize: "",
    companyDescription: "",
    companyPerks: "",
    // orderID: "",
  });
  const [logoPreview, setLogoPreview] = React.useState(null);
  const [coverPreview, setCoverPreview] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email format is invalid.";
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required.";
    if (!formData.jobCategories)
      newErrors.jobCategories = "Job categories are required.";
    if (!formData.jobType) newErrors.jobType = "Job type is required.";
    if (!formData.jobLocation)
      newErrors.jobLocation = "Job location is required.";
    if (!formData.jobDuration)
      newErrors.jobDuration = "Job duration is required.";
    if (!formData.discription)
      newErrors.discription = "Job description is required.";
    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required.";
    }
    if (!formData.positionsAvailable)
      newErrors.positionsAvailable = "Positions available is required.";
    if (!formData.maxApplicants)
      newErrors.maxApplicants = "Maximum number of applicants is required.";
    if (!formData.companyName)
      newErrors.companyName = "Company name is required.";
    if (!formData.companyWebsite)
      newErrors.companyWebsite = "Company website is required.";
    else if (!/^https?:\/\/.+\..+$/.test(formData.companyWebsite))
      newErrors.companyWebsite = "Enter a valid website URL.";
    if (!formData.companyIndustry)
      newErrors.companyIndustry = "Company size is required.";
    if (!formData.companySize)
      newErrors.companySize = "Company size is required.";
    if (!formData.companyDescription)
      newErrors.companyDescription = "Company description is required.";
    if (!formData.companyPerks)
      newErrors.companyPerks = "Company perks and benefits are required.";
    // if (!formData.orderID) newErrors.orderID = "Order ID is required.";

    // Logo and cover validation
    if (!logoPreview) newErrors.logo = "Company logo is required.";
    if (!coverPreview) newErrors.cover = "Company cover is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (setPreview) => setPreview(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form Data Submitted: ", formData); // Debug log
      // Proceed with form submission logic
    } else {
      console.error("Form Validation Failed: ", errors); // Debug log
    }
  };

  const uploadLogoToServer = async () => {
    if (!logoPreview) {
      setErrors((prev) => ({
        ...prev,
        logo: "Please select a logo before uploading.",
      }));
      return;
    }
    try {
      const file = await fetch(logoPreview).then((res) => res.blob()); // Convert preview back to file
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle server response
      console.log("Logo uploaded successfully:", response.data);
      setFormData((prev) => ({
        ...prev,
        companyLogo: response.data.url, // Save uploaded logo URL in form data
      }));
    } catch (error) {
      console.error("Error uploading logo:", error);
      setErrors((prev) => ({
        ...prev,
        logo: "Failed to upload logo. Please try again.",
      }));
    }
  };

  const uploadCoverToServer = async () => {
    if (!coverPreview) {
      setErrors((prev) => ({
        ...prev,
        cover: "Please select a cover before uploading.",
      }));
      return;
    }
    try {
      const file = await fetch(coverPreview).then((res) => res.blob()); // Convert preview back to file
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle server response
      console.log("Cover uploaded successfully:", response.data);
      setFormData((prev) => ({
        ...prev,
        companyCover: response.data.url, // Save uploaded cover URL in form data
      }));
    } catch (error) {
      console.error("Error uploading cover:", error);
      setErrors((prev) => ({
        ...prev,
        cover: "Failed to upload cover. Please try again.",
      }));
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: "auto" }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Post a job today
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Get access to millions of job seekers and recruit the right talent to accelerate growth.
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        sx={{ marginBottom: 4 }}
      >
        <Tab label="Free job" />
        <Tab label="Paid job" />
      </Tabs>

      {/* Form */}
      <Box
        component="form"
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={handleSubmit}
      >
        {/* Job Poster Information */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Job poster information
        </Typography>
        <Grid container spacing={3} mb={4}>
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

        {/*--------------- Job Information-------------- */}

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Job information
        </Typography>
        <Grid container spacing={3} mb={4}>
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
              onChange={(e) =>
                handleInputChange("jobCategories", e.target.value)
              }
              error={!!errors.jobCategories}
              helperText={errors.jobCategories}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job type"
              placeholder="Full time"
              value={formData.jobType}
              onChange={(e) => handleInputChange("jobType", e.target.value)}
              error={!!errors.jobType}
              helperText={errors.jobType}
            />
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
                    inputProps={{ 'aria-label': 'deadline date-picker' }}
                    {...inputProps}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Positions avalible"
              placeholder=""
              value={formData.positionsAvailable}
              onChange={(e) => handleInputChange("positionsAvailable", e.target.value)}
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
              onChange={(e) => handleInputChange("maxApplicants", e.target.value)}
              error={!!errors.maxApplicants}
              helperText={errors.maxApplicants}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormLabel>Your Job discription</CustomFormLabel>
            <ReactQuill
              value={formData.discription}
              onChange={(value) => setFormData({ ...formData, discription: value })}
              placeholder="Please enter your job discription"
            />
          </Grid>
        </Grid>

        {/* ----------------- Company Information----------------------- */}

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Company information
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company name"
              placeholder="What's the company name?"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              error={!!errors.companyName}
              helperText={errors.companyName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company website"
              placeholder="https://company.com"
              value={formData.companyWebsite}
              onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
              error={!!errors.companyWebsite}
              helperText={errors.companyWebsite}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company industry"
              placeholder="What's the company's industry?"
              value={formData.companyIndustry}
              onChange={(e) => handleInputChange("companyIndustry", e.target.value)}
              error={!!errors.companyIndustry}
              helperText={errors.companyIndustry}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="Company size"
              placeholder="50"
              type="number"
              value={formData.companySize}
              onChange={(e) => handleInputChange("companySize", e.target.value)}
              error={!!errors.companySize}
              helperText={errors.companySize}
            />
          </Grid>

          {/* Company Logo & Cover */}
          <Grid container spacing={3} mb={2} mt={2}>
            {/* Logo Upload */}
            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6" mb={1}>
                Company Logo
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
                border="1px solid #ddd"
                padding={2}
                borderRadius={2}
                width="100%"
                maxWidth="300px"
                position="relative"
              >
                {logoPreview ? (
                  <Box position="relative">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    <IconButton
                      size="small"
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "white",
                      }}
                      onClick={() => handleRemoveImage(setLogoPreview)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary" textAlign="center">
                    No logo uploaded yet
                  </Typography>
                )}
                <Button variant="contained" component="label" size="small">
                  Choose Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setLogoPreview)}
                  />
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  onClick={uploadLogoToServer}>
                  Upload logo
                </Button>
              </Box>
            </Grid>

            {/* Cover Upload */}
            <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6" mb={1}>
                Company Cover
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
                border="1px solid #ddd"
                padding={2}
                borderRadius={2}
                width="100%"
                maxWidth="500px"
                position="relative"
              >
                {coverPreview ? (
                  <Box position="relative" width="100%">
                    <img
                      src={coverPreview}
                      alt="Cover Preview"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <IconButton
                      size="small"
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "white",
                      }}
                      onClick={() => handleRemoveImage(setCoverPreview)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body2" color="textSecondary" textAlign="center">
                    No cover uploaded yet
                  </Typography>
                )}
                <Button variant="contained" component="label" size="small">
                  Choose Cover
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setCoverPreview)}
                  />
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  onClick={uploadCoverToServer}
                >
                  Upload Cover
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CustomFormLabel>Company description</CustomFormLabel>
            <ReactQuill
              value={formData.companyDescription}
              onChange={(value) => setFormData({ ...formData, companyDescription: value })}
              placeholder="Write a detailed description about the company."
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormLabel>Company perks & benefits</CustomFormLabel>
            <ReactQuill
              value={formData.companyPerks}
              onChange={(value) => setFormData({ ...formData, companyPerks: value })}
              placeholder="Write a Company perks & benefits of the company."
            />
          </Grid>
        </Grid>

        {/* Featured Job */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Featured job
        </Typography>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Order ID"
              placeholder="Insert your order ID"
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
        // fullWidth
        >
          Submit for approval
        </Button>
      </Box>
    </Box>
  );
};

export default PostJobForm;