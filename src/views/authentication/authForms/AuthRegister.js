import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Alert, Stack, Tabs, Tab, CircularProgress } from '@mui/material';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import useAuth from 'src/guards/authGuard/UseAuth';
import useMounted from 'src/guards/authGuard/UseMounted';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [selectedRole, setSelectedRole] = useState('applicant');
  const mounted = useMounted();
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Validation schema for the form
  const registerSchema = Yup.object().shape({
    userName: Yup.string().required('userName is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      // acceptTerms: false,
      role: selectedRole,
    },

    validationSchema: registerSchema,

    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        // console.log('Form submitted with values:', values); 

        await signup(values.userName, values.email, values.password, values.role);        
        navigate('/auth/login');
        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(true);
        }
      } catch (err) {
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // Handle tab change for role selection
  const handleRoleChange = (event, newRole) => {
    setSelectedRole(newRole);
    formik.setFieldValue('role', newRole);
  };

  return (
    <>
      {title && <Typography fontWeight="700" variant="h3" mb={1}>{title}</Typography>}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography component="span" color="textSecondary" variant="h6" fontWeight="400" position="relative" px={2}>
            or sign up with
          </Typography>
        </Divider>
      </Box>

      {/* Tabs for Role Selection */}
      <Tabs
        value={selectedRole}
        onChange={handleRoleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ mt: 2, mb: 2 }}
      >
        <Tab value="applicant" label="Job Applicant" />
        <Tab value="recruiter" label="Recruiter" />
      </Tabs>

      <Box>
        {errors.submit && (
          <Box mt={2}>
            <Alert severity="error">{errors.submit}</Alert>
          </Box>
        )}

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack mb={3}>
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                id="name"
                variant="outlined"
                fullWidth
                {...getFieldProps('userName')}
                error={Boolean(touched.userName && errors.userName)}
                helperText={touched.userName && errors.userName}
              />
              <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
              <CustomTextField
                id="email"
                variant="outlined"
                fullWidth
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                type="password"
                variant="outlined"
                fullWidth
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>

            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                `Sign Up as ${selectedRole}`
              )}
            </Button>
          </Form>
        </FormikProvider>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
