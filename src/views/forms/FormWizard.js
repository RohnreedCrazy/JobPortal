import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  // FormControlLabel,
  Alert,
  // Fab,
  // Tooltip
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
// import {IconPlus} from '@tabler/icons';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import FreeSoloAutocomplete from '../../components/forms/form-elements/autoComplete/FreeSoloAutocomplete';
import MultipleValuesAutocomplete from 'src/components/forms/form-elements/autoComplete/MultipleValuesAutocomplete';
import ParentCard from '../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import QuilEditor from '../../components/forms/form-elements/quilEditor/quilEditor';
import CountrySelectAutocomplete from '../../components/forms/form-elements/autoComplete/CountrySelectAutocomplete';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const steps = ['Basic Info', 'About Company', 'Employee Benefits', 'Workplace Environment', 'Tech Stack & Tools', 'FAQ'];

const CompanyRegist = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  // Create an instance of sweetalert2-react-content
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

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
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const CompanySuccess = () => {
    MySwal.fire({
      title: "Congratulations!",
      text: "You have successfully created a company",
      icon: "success",
      confirmButtonText: "Okay"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/apps/freejobpost");
      }
    });
  };

  // eslint-disable-next-line consistent-return
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <CustomFormLabel>Basic Info</CustomFormLabel>
            <Typography>Fill in the detail of company to set up a career page.</Typography>
            <CustomFormLabel htmlFor="Companyname">Company name</CustomFormLabel>
            <CustomTextField
              id="Companyname"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="TaxIDNumber">Tax ID Number / VAT</CustomFormLabel>
            <CustomTextField
              id="TaxIDNumber/"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Name">Sector</CustomFormLabel>
            <FreeSoloAutocomplete />
            <CustomFormLabel htmlFor="Name">Phone</CustomFormLabel>
            <CustomTextField
              id="Phone"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Email">Email</CustomFormLabel>
            <CustomTextField
              id="Email"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Country">Country</CustomFormLabel>
            <CountrySelectAutocomplete />
            <CustomFormLabel htmlFor="Name">WebsiteURL</CustomFormLabel>
            <CustomTextField
              id="WebsiteURL"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Numberofemployees">Number of employees</CustomFormLabel>
            <CustomTextField
              id="Numberofemployees"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Amountofcapital">Amount of capital</CustomFormLabel>
            <CustomTextField
              id="Amountofcapital"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Logo">Logo</CustomFormLabel>
            <CustomTextField
              id="Logo"
              type="file"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="CoverImage">Cover Image</CustomFormLabel>
            <CustomTextField
              id="CoverImage"
              type="file"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel>Company summary</CustomFormLabel>
            <QuilEditor />
            <CustomFormLabel>Company contact</CustomFormLabel>
            <Typography>Please provide a point of contact for the company so we can validate the company information.</Typography>
            <CustomFormLabel htmlFor="Companycontact">Contact person</CustomFormLabel>
            <CustomTextField
              id="Companycontact"
              type="number"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Password">Contact phone number</CustomFormLabel>
            <CustomTextField
              id="Password"
              type="number"
              variant="outlined"
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <CustomFormLabel>About Company</CustomFormLabel>
            <Typography>Help job seekers learn about your company by introducing your job and services. We recommend including all available languages.</Typography>
            <CustomFormLabel htmlFor="Lname">YouTube video URL</CustomFormLabel>
            <CustomTextField
              id="YouTubevideoURL"
              variant="outlined"
              placeholder="https://www.youtube.com/..."
              fullWidth
            />
            <CustomFormLabel>jobs or services</CustomFormLabel>
            <QuilEditor />
            <CustomFormLabel>Mission</CustomFormLabel>
            <QuilEditor />
            <CustomFormLabel>Media coverage</CustomFormLabel>
            <QuilEditor />
            <CustomFormLabel>Social media links</CustomFormLabel>
            <Typography>Provide your social media channels so we can validate the company information.</Typography>
            <CustomFormLabel htmlFor="Lname">LinkedIn URL</CustomFormLabel>
            <CustomTextField
              id="Lname"
              type="text"
              variant="outlined"
              placeholder="https://www.linkedin.com/..."
              fullWidth
            />
            <CustomFormLabel htmlFor="Lname">X handle</CustomFormLabel>
            <CustomTextField
              id="Lname"
              type="text"
              variant="outlined"
              placeholder="@MyTwitterHandle"
              fullWidth
            />
            <CustomFormLabel htmlFor="Lname">Facebook page URL</CustomFormLabel>
            <CustomTextField
              id="Lname"
              type="text"
              variant="outlined"
              placeholder="https://www.facebook.com/..."
              fullWidth
            />
            <CustomFormLabel htmlFor="Lname">Instagram URL</CustomFormLabel>
            <CustomTextField
              id="Lname"
              type="text"
              variant="outlined"
              placeholder="https://www.instagram.com/..."
              fullWidth
            />
            <CustomFormLabel htmlFor="Lname">Medium URL</CustomFormLabel>
            <CustomTextField
              id="Lname"
              type="text"
              variant="outlined"
              placeholder="https://www.medium.com/..."
              fullWidth
            />
            <CustomFormLabel htmlFor="Lname">Social Sharing Image Preview</CustomFormLabel>
            <CustomTextField
              id="Lname"
              type="file"
              variant="outlined"
              placeholder="Placeholder"
              fullWidth
            />
          </Box>
        );
      case 2:
        return (
          <Box pt={3}>
            <CustomFormLabel>Employee Benefits</CustomFormLabel>
            <Typography>Clear demonstration of employee benefits can help you attract top talents to submit their applications.</Typography>
            <CustomFormLabel htmlFor="Lname">Employee benefits</CustomFormLabel>
            <QuilEditor />
          </Box>
        );
      case 3:
        return (
          <Box pt={4}>
            <CustomFormLabel>Workplace Environment</CustomFormLabel>
            <Typography>Share with job seekers about your work environment (and include photos) to increase application submissions.</Typography>
            <CustomFormLabel htmlFor="Lname">Work culture & environment</CustomFormLabel>
            <QuilEditor />
          </Box>
        );
      case 4:
        return (
          <Box pt={5}>
            <CustomFormLabel>Tech Stack & Tools</CustomFormLabel>
            <Typography>Highlight your company’s tech stack and tools to attract top talents.</Typography>
            <CustomFormLabel htmlFor="Lname">Tech Stack</CustomFormLabel>
            <MultipleValuesAutocomplete />
            <CustomFormLabel htmlFor="Lname">Tools</CustomFormLabel>
            <MultipleValuesAutocomplete />
          </Box>
        );
      case 5:
        return (
          <Box pt={5}>
            <CustomFormLabel>FAQ</CustomFormLabel>
            <Typography>Share more insights and list out answers to frequently asked questions.</Typography>
            <CustomFormLabel htmlFor="Lname">Question</CustomFormLabel>
            <CustomTextField
              id="question"
              type="text"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel>Answer</CustomFormLabel>
            <QuilEditor />
            {/* <Tooltip title="Add">
              <Fab color="secondary" aria-label="plus">
                <IconPlus width={20} />
              </Fab>
            </Tooltip> */}
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
      <Breadcrumb title="Company Register" description="this is Company Register page" />
      <ParentCard title='Set up your company’s career page'>
        <Box width="100%">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
              // }
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
                  <Button onClick = {CompanySuccess} variant="contained" color="primary">
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

export default CompanyRegist;
