import React, { useState } from 'react';
import { CardContent, Grid, Typography, MenuItem, Box, Avatar, Button, Stack } from '@mui/material';
import axios from 'src/utils/axios_test';

// components
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';

// images
import user1 from 'src/assets/images/profile/user-1.jpg';

// locations, gender, currencies
const locations = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'india', label: 'India' },
  { value: 'russia', label: 'Russia' },
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const currencies = [
  { value: 'us', label: 'US Dollar ($)' },
  { value: 'uk', label: 'United Kingdom (Pound)' },
  { value: 'india', label: 'India (INR)' },
  { value: 'russia', label: 'Russia (Ruble)' },
];

const AccountTab = () => {
  const [location, setLocation] = useState('india');
  const [gender, setGender] = useState('female');
  const [currency, setCurrency] = useState('india');
  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const users = localStorage.getItem('user');
  const user = JSON.parse(users);

  // Handle Avatar Change
  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAvatar(URL.createObjectURL(selectedFile));
    }
  };

  // Reset Avatar to default
  const handleResetAvatar = () => {
    setAvatar(user1); // Reset to default image
    setFile(null); // Clear the selected file
  };

  // Handle Avatar Upload to Server
  const uploadAvatarToServer = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file); 
      const response = await axios.post('/api/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const data = response.data.filePath;

        setAvatarURL(data);
      } else {
        console.error('Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  // Manual Validation
  const validateForm = () => {
    let formErrors = {};
    if (!phone) formErrors.phone = 'Phone is required';
    if (!address) formErrors.address = 'Address is required';
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return; // Stop if there are validation errors

    try {
      // Check if there's an avatar to upload
      if (file) {
        await uploadAvatarToServer(file); // Upload avatar first
      }

      // Send form data to the server
      const response = await axios.put('/api/account/my-account/update', {
        id:user._id,
        avatar: avatarURL || user.avatar,
        location,
        gender,
        currency,
        phone,
        address,
      });

      if (response.status === 200) {
        console.log('User data updated successfully');
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              {user.role === 'applicant' ? 'Applicant' : 'Recruiter'}
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Change your profile picture from here
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={ avatar || user.avatar || user1}
                  alt="Avatar"
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                  <Button variant="contained" color="primary" component="label">
                    Upload
                    <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleResetAvatar}>
                    Reset
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => file && uploadAvatarToServer(file)}
                  disabled={!file}
                >
                  Save Avatar
                </Button>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Change Password */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Password
            </Typography>
            <Typography color="textSecondary" mb={3}>
              To change your password please confirm here
            </Typography>
            <form>
              <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-cpwd">
                Current Password
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                disabled
                type="password"
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">New Password</CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                disabled
                type="password"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">Confirm Password</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
                disabled
              />
            </form>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Edit Details */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Personal Details
            </Typography>
            <Typography color="textSecondary" mb={3}>
              To change your personal detail, edit and save from here
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-name">
                  Your Name
                </CustomFormLabel>
                <CustomTextField
                  id="text-name"
                  value={user.userName}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-gender">
                  Gender
                </CustomFormLabel>
                <CustomSelect
                  fullWidth
                  id="text-gender"
                  variant="outlined"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-location">
                  Location
                </CustomFormLabel>
                <CustomSelect 
                  fullWidth
                  id="text-location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-currency">
                  Currency
                </CustomFormLabel>
                <CustomSelect
                  fullWidth
                  id="text-currency"
                  variant="outlined"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-email">
                  Email
                </CustomFormLabel>
                <CustomTextField
                  id="text-email"
                  value={user.email}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-phone">
                  Phone
                </CustomFormLabel>
                <CustomTextField
                  id="text-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="outlined"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-address">
                  Address
                </CustomFormLabel>
                <CustomTextField
                  id="text-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="outlined"
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
              <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
                Save
              </Button>
              <Button size="large" variant="text" color="error">
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
