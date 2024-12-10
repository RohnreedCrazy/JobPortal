import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import ReactQuill from "react-quill";
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyInformation = ({
  formData,
  errors, 
  handleInputChange,
  setFormData,
  logoPreview,
  coverPreview,
  handlecoverFileChange,
  handlelogoFileChange,
  handleRemoveImage,
  uploadLogoToServer,
  uploadCoverToServer,
  setLogoPreview,
  setCoverPreview,
}) => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Company information
      </Typography>
      <Grid container spacing={3} mb={4} mt={1}>
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
            onChange={(e) =>
              handleInputChange("companyWebsite", e.target.value)
            }
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
            onChange={(e) =>
              handleInputChange("companyIndustry", e.target.value)
            }
            error={!!errors.companyIndustry}
            helperText={errors.companyIndustry}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company size"
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
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
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
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="center"
                >
                  No logo uploaded yet
                </Typography>
              )}
              <Button variant="contained" component="label" size="small">
                Choose Logo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handlelogoFileChange(e, setLogoPreview)}
                />
              </Button>
              <Button
                variant="contained"
                component="label"
                size="small"
                onClick={uploadLogoToServer}
              >
                Upload Logo
              </Button>
            </Box>
          </Grid>

          {/* Cover Upload */}
          <Grid
            item
            xs={12}
            sm={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
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
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="center"
                >
                  No cover uploaded yet
                </Typography>
              )}
              <Button variant="contained" component="label" size="small">
                Choose Cover
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handlecoverFileChange(e, setCoverPreview)}
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contact Number"
            placeholder=""
            value={formData.contactNumber}
            onChange={(e) =>
              handleInputChange("contactNumber", e.target.value)
            }
            error={!!errors.contactNumber}
            helperText={errors.contactNumber}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomFormLabel>Company description</CustomFormLabel>
          <ReactQuill
            value={formData.companyDescription}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, companyDescription: value }))
            }
            placeholder="Write a detailed description about the company."
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel>Company perks & benefits</CustomFormLabel>
          <ReactQuill
            value={formData.companyPerks}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, companyPerks: value }))
            }
            placeholder="Write company perks & benefits."
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyInformation;
