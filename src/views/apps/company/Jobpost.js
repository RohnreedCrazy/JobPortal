import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import MultipleValuesAutocomplete from 'src/components/forms/form-elements/autoComplete/MultipleValuesAutocomplete';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
import CountrySelectAutocomplete from '../../../components/forms/form-elements/autoComplete/CountrySelectAutocomplete';
import { fetchjobs } from 'src/store/apps/FindJobs/FindJobsSlice'; 
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const steps = ['Basic Info', 'Post'];

const JobPost = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formData, setFormData] = React.useState({
    jobTitle: "",
    jobType: "",
    duration: "",
    location: "",
    salary: "",
    applicationDeadline: "",
    maxApplicants: "",
    positionsAvailable: "",
    skills: [],
    jobDescription: "",
    companyDescription: "",
    requirements: "",
    interviewProcess: ""
  });

  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { jobs, error } = useSelector(state => state.FindJobs);

  React.useEffect(() => {
    dispatch(fetchjobs()); // Fetch jobs data on component mount
  }, [dispatch]);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSkillsChange = (newSkills) => {
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  const postJobData = async () => {
    try {
      console.log(`this is formData : `,formData)
      const response = await fetch('https://your-api-endpoint.com/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        MySwal.fire({
          title: "Success!",
          text: "Your application has been submitted successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/apps/jobpost");
          }
        });
      } else {
        throw new Error('Failed to post job');
      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: error.message || `Server Error`,
        icon: "error",
        confirmButtonText: "Okay"
      });
    }
  };

  const CompanySuccess = () => {
    postJobData();
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <CustomFormLabel>Basic Info</CustomFormLabel>
            <Typography>Fill in the detail of Job</Typography>
            <CustomFormLabel htmlFor="jobTitle">Job title</CustomFormLabel>
            <CustomTextField
              id="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="jobType">Job type</CustomFormLabel>
            <CustomTextField
              id="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="duration">Duration</CustomFormLabel>
            <CustomTextField
              id="duration"
              value={formData.duration}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="location">Location</CustomFormLabel>
            <CountrySelectAutocomplete
              value={formData.location}
              onChange={handleInputChange}
            />
            <CustomFormLabel htmlFor="salary">Salary</CustomFormLabel>
            <CustomTextField
              id="salary"
              value={formData.salary}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="applicationDeadline">Application Deadline</CustomFormLabel>
            <CustomTextField
              id="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="maxApplicants">Max Number of Applicants</CustomFormLabel>
            <CustomTextField
              id="maxApplicants"
              value={formData.maxApplicants}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="positionsAvailable">Positions Available</CustomFormLabel>
            <CustomTextField
              id="positionsAvailable"
              value={formData.positionsAvailable}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel>Skills</CustomFormLabel>
            <MultipleValuesAutocomplete
              value={formData.skills}
              onChange={handleSkillsChange}
            />
            <CustomFormLabel>Job Discriptions</CustomFormLabel>
            <ReactQuill
              value={formData.jobDescription}
              onChange={(value) => setFormData({ ...formData, jobDescription: value })}
              placeholder="Type here..."
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <CustomFormLabel>About Company</CustomFormLabel>
            <Typography>Help job seekers learn about your company by introducing your job and services. We recommend including all available languages.</Typography>
            <CustomFormLabel>Requirements</CustomFormLabel>
            <ReactQuill
              value={formData.requirements}
              onChange={(value) => setFormData({ ...formData, requirements: value })}
              placeholder="Type here..."
            />
            <CustomFormLabel>Interview Process</CustomFormLabel>
            <ReactQuill
              value={formData.interviewProcess}
              onChange={(value) => setFormData({ ...formData, interviewProcess: value })}
              placeholder="Type here..."
            />
          </Box>
        );
      default:
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <PageContainer>
      <Breadcrumb title="Post a job" description="this is Post a job page" />
      <ParentCard title='Set up your company’s career page'>
        <Box width="100%">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Stack spacing={2} mt={3}>
                <Alert severity='success' mt={2}>All steps completed - you&apos;re finished</Alert>
                <Box textAlign="right" display="flex" gap="8px" justifyContent="flex-end">
                  <Button onClick={handleReset} variant="contained" color="error">
                    Reset
                  </Button>
                  <Button onClick={CompanySuccess} variant="contained" color="primary">
                    Post
                  </Button>
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <Box>{handleSteps(activeStep)}</Box>

              <Box display="flex" flexDirection="row" mt={3}>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box flex="1 1 auto" />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default JobPost;
