import React from 'react';
import { Button,  styled,  } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    color: theme.palette.text.secondary,
  }));

  // page
  return (
    <>
      {/* <StyledButton
        color="inherit"
        variant="text"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          color: open ? 'primary.main' : (theme) => theme.palette.text.secondary,
        }}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        endIcon={<IconChevronDown size="15" style={{ marginLeft: '-5px', marginTop: '2px' }} />}
      >
        Demos
      </StyledButton>
      {open && (
        <Paper
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          sx={{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '55px',
            maxWidth: '1200px',
            width: '100%',
          }}
          elevation={9}
        >
          <DemosDD />
        </Paper>
      )} */}
      {/* <Box>
        <StyledButton
          color="inherit"
          variant="text"
          onMouseEnter={handleOpen2}
          onMouseLeave={handleClose2}
          sx={{
            color: open2 ? 'primary.main' : (theme) => theme.palette.text.secondary,
          }}
          endIcon={<IconChevronDown size="15" style={{ marginLeft: '-5px', marginTop: '2px' }} />}
        >
          Jobs
        </StyledButton>
        {open2 && (
          <Paper
            // onMouseEnter={handleOpen2}
            // onMouseLeave={handleClose2}
            onClick = {}
            sx={{
              position: 'absolute',
              left: '0',
              right: '0',
              top: '55px',
              width: '850px',
              margin: '0 auto',
            }}
            elevation={9}
          >
            <Grid container>
              <Grid item sm={8} display="flex">
                <Box p={4} pr={0} pb={3}>
                  <AppLinks />
                </Box>
                <Divider orientation="vertical" />
              </Grid>
              <Grid item sm={4}>
                <Box p={4}>
                  <QuickLinks />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Box> */}
      <StyledButton component={Link} color="inherit" variant="text" to={"/apps/FindJobs/jobs"}>
        Find Jobs
      </StyledButton>
      <StyledButton
        color="inherit"
        variant="text"
        to={"/apps/company/companies"}
        component={Link}
      >
        Campanies
      </StyledButton>
      <StyledButton component={Link} color="inherit" variant="text" to={"/apps/freejobpost"}>
        Job Post
      </StyledButton>
      <Button component={Link} color="primary"  variant="contained" to={"/auth/login"}>
        Login
      </Button>
      <Button component={Link} color="primary" variant="outlined" to={"/auth/register"}>
        Signin
      </Button>
    </>
  );
};

export default Navigations;
