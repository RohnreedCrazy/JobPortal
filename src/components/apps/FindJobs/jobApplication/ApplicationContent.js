import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Button,
  Divider,
  Stack,
  IconButton,
  Grid,
  Tooltip,
  useTheme,
} from '@mui/material';
import { InsertDriveFile, PictureAsPdf } from '@mui/icons-material';
import { IconStar, IconAlertCircle, IconTrash, IconPhone } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import applicationAvatar from 'src/assets/images/profile/user-8.jpg';
import {
  fetchApplications,
  starApplication,
  importantApplication,
  deleteApplication,
  changeApplicationStatus,
} from 'src/store/apps/jobApplications/JobApplicationsSlice';

const ApplicationContent = () => {
  const applications = useSelector((state) => state.JobApplicationsReducer.applicationContent);
  const dispatch = useDispatch();
  const theme = useTheme();
  const errorColor = theme.palette.error.light;

  const attachments = applications
    ? [
        {
          name: 'Resume (PDF)',
          type: 'Document',
          icon: <PictureAsPdf sx={{ color: 'white' }} />,
          href: applications?.resume || '#',
        },
        {
          name: 'Portfolio URL',
          type: 'Link',
          icon: <InsertDriveFile sx={{ color: 'white' }} />,
          href: applications?.portfolioURL || '#',
        },
        {
          name: `${applications.mobile}`,
          type: 'Contact',
          icon: <IconPhone sx={{ color: 'white' }} />,
          href: `tel:${applications?.mobile || ''}`,
        },
      ]
    : [];

  const handleStatusChange = (id, status) => {
    if (!id) {
      return;
    }
    dispatch(changeApplicationStatus(id, status));
  };

  React.useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  if (applications ==1) {
    return (
      <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
        <Box>
          <Typography variant="h4">Please Select an Application</Typography>
          <br />
          <img src={emailIcon} alt="No application selected" width={'250px'} />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Stack p={2} gap={0} direction="row">
        <Tooltip title={applications.starred ? 'Unstar' : 'Star'}>
          <IconButton onClick={() => dispatch(starApplication(applications._id))}>
            <IconStar stroke={1.3} size="18" />
          </IconButton>
        </Tooltip>
        <Tooltip title={applications.important ? 'Mark as Not Important' : 'Mark as Important'}>
          <IconButton onClick={() => dispatch(importantApplication(applications._id))}>
            <IconAlertCircle
              size="18"
              stroke={1.3}
              style={{
                fill: applications.status ? errorColor : '',
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => dispatch(deleteApplication(applications._id))}>
            <IconTrash size="18" stroke={1.3} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />
      <Box p={3}>
        <Box display="flex" alignItems="center" sx={{ pb: 3 }}>
          <Avatar
            alt="applicationAvatar"
            src={applications?.avatar || applicationAvatar}
            sx={{ width: 56, height: 56 }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{applications.name}</Typography>
            <Typography variant="body2">{applications.email}</Typography>
          </Box>
          <Chip
            label={applications.status}
            sx={{ ml: 'auto', height: '21px' }}
            size="medium"
            color={
              applications.status === 'Pending'
                ? 'primary'
                : applications.status === 'Accepted'
                ? 'success'
                : applications.status === 'Rejected'
                ? 'error'
                : 'info'
            }
          />
        </Box>

        <Box sx={{ py: 2 }}>
          <Typography variant="h5">My experience</Typography>
        </Box>

        <Box sx={{ py: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: applications.experience }} />
        </Box>
      </Box>
      <Divider />
      <Box p={3}>
        <Box
          p={2}
          sx={{
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid container spacing={2}>
            {attachments.map((file, index) => (
              <Grid item key={index} xs={6} sm={4} md={3}>
                <a
                  href={file.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                        transform: 'scale(1.02)',
                        transition: 'all 0.2s',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: 'primary.main',
                        color: '#ffffff',
                        marginBottom: '8px',
                      }}
                    >
                      {file.icon}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#888' }}>
                      {file.type}
                    </Typography>
                  </Box>
                </a>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Divider />
      <Box p={3}>
        <Stack direction="row" gap={2}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => handleStatusChange(applications?._id, 'Accepted')}
            disabled={!applications?._id}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleStatusChange(applications?._id, 'Rejected')}
            disabled={!applications?._id}
          >
            Reject
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ApplicationContent;




