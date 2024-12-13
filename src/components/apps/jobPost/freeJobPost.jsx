import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";
import "./Quill.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import axios from 'src/utils/axios';
import { useDispatch } from 'react-redux';
import { postJob } from '../../../store/apps/FindJobs/FindJobsSlice';

import JobPosterInfo from "./JobPosterInfo";
import JobInformation from "./JobInformation";
import CompanyInformation from "./CompanyInformation";
import AlertComponent from "src/components/alert/alert";

const PostJobForm = () => {
  const dispatch = useDispatch();
  const getUser = localStorage.getItem('user');
  const User = JSON.parse(getUser);
  const MySwal = withReactContent(Swal);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [msgtype, setMsgtype] = useState('');

  const [formData, setFormData] = React.useState({
    id: User._id,
    fullName: "Robin M",
    email: "robin@gmail.com",
    jobTitle: "full stack developer",
    jobCategories: "Development",
    jobType: "Full-Time",
    salary: "5000",
    jobLocation: "chicago",
    jobDuration: "50",
    discription: "<h2>hello</h2>",
    deadline: `12/24/2025`,
    positionsAvailable: "20",
    maxApplicants: "50",
    companyCover: '',
    companyLogo: '',
    contactNumber: '+91321645987',
    companyName: "PigCampany",
    companyWebsite: "http://company.com",
    companyIndustry: "aaaaaa",
    companySize: "50",
    companyDescription: "bbbbbbbbbbbbbbb",
    companyPerks: "<P>aaaaaaaaaaaaaaaaaaaaaaaaaa</P>",
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
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Clear previous errors
    setErrors({});

    // Required field validations
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email format is invalid.";
    if (!formData.jobTitle) newErrors.jobTitle = "Job title is required.";
    if (!formData.jobCategories) newErrors.jobCategories = "Job categories are required.";
    if (!formData.jobType) newErrors.jobType = "Job type is required.";
    if (!formData.jobLocation) newErrors.jobLocation = "Job location is required.";
    if (!formData.jobDuration) newErrors.jobDuration = "Job duration is required.";
    if (!formData.discription) newErrors.discription = "Job description is required.";
    if (!formData.salary) newErrors.salary = "Salary is required.";
    if (!formData.deadline) newErrors.deadline = "Deadline is required.";
    if (!formData.positionsAvailable) newErrors.positionsAvailable = "Positions available is required.";
    if (!formData.maxApplicants) newErrors.maxApplicants = "Maximum number of applicants is required.";
    if (!formData.companyName) newErrors.companyName = "Company name is required.";
    if (!formData.companyWebsite) newErrors.companyWebsite = "Company website is required.";
    else if (!/^https?:\/\/.+\..+$/.test(formData.companyWebsite))
      newErrors.companyWebsite = "Enter a valid website URL.";
    if (!formData.companyIndustry) newErrors.companyIndustry = "Company industry is required.";
    if (!formData.companySize) newErrors.companySize = "Company size is required.";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required.";
    if (!formData.companyDescription) newErrors.companyDescription = "Company description is required.";
    if (!formData.companyPerks) newErrors.companyPerks = "Company perks and benefits are required.";

    // Logo and cover validation
    if (!logoPreview) newErrors.logo = "Company logo is required.";
    if (!coverPreview) newErrors.cover = "Company cover is required.";

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
      toast.error("Form validation failed.");
      return;
    }
    try {
      dispatch(postJob(formData));
      MySwal.fire({
        title: "Success!",
        text: "Your job has been successfully submitted for approval.",
        icon: "success",
        confirmButtonText: "Okay",
      });

    } catch (error) {
      toast.error('There was an issue submitting your job post. Please try again.')
    }
  };


  // Upload function for logo
  const uploadLogoToServer = async () => {
    if (!imagefile) {
      setText("Please select a logo first!");
      setOpen(true);
      setMsgtype("warning")
      return;
    }

    const formData = new FormData();
    formData.append("image", imagefile);

    try {
      const response = await axios.post("/api/upload/logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText("Logo uploaded successfully!");
      setOpen(true);
      setMsgtype("success")
      setFormData((prev) => ({ ...prev, companyLogo: response.data.filePath }));
    } catch (error) {

      setText("Error uploading logo!");
      setOpen(true);
      setMsgtype("error");
    }
  };
  // Upload function for cover
  const uploadCoverToServer = async () => {
    if (!imagefile) {
      setText("Please select a cover first!");
      setOpen(true);
      setMsgtype("warning")
      return;
    }

    const formData = new FormData();
    formData.append("image", imagefile);

    try {
      const response = await axios.post("/api/upload/cover", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setText("Cover uploaded successfully!");
      setOpen(true);
      setMsgtype("success")
      setFormData((prev) => ({ ...prev, companyCover: response.data.filePath }));
    } catch (error) {

      setText("Error uploading Cover!");
      setOpen(true);
      setMsgtype("error");
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

      {/* Form */}
      <Box
        component="form"
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Job Poster Information */}
        <JobPosterInfo
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
        />

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
            <TextField
              fullWidth
              label="Order ID"
              placeholder="Insert your order ID"
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          variant="contained"
        >
          Submit for approval
        </Button>
      </Box>
      <AlertComponent open={open} handleClose={handleClose} text={text} type={msgtype} />
    </Box>
  );
};

export default PostJobForm;
