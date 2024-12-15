import { useState } from 'react';
import { Box, Menu, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons';
import Howitworks from './HowitworksLinks';
import JobLinks from './JobLinks';
import React from 'react';

const AppDD = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Box>
        <Button
          aria-label="show 11 new notifications"
          color="inherit"
          variant="text"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            bgcolor: anchorEl2 ? 'primary.light' : '',
            color: anchorEl2 ? 'primary.main' : (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClick2}
          endIcon={<IconChevronDown size="15" style={{ marginLeft: '-5px', marginTop: '2px' }} />}
        >
          How it works
        </Button>
        {/* ------------------------------------------- */}
        {/* howit works Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '250px',
            },
            '& .MuiMenu-paper ul': {
              p: 0,
            },
          }}
        >
          <Grid container>
            <Grid item sm={4} display="flex">
              <Box p={4} pr={0} pb={3}>
                <Howitworks />
              </Box>
            </Grid>
          </Grid>
        </Menu>
      </Box>
      <Button color="inherit" sx={{ color: (theme) => theme.palette.text.secondary }} variant="text" to="/apps/FindJobs/jobs" component={Link}>
        FindJobs
      </Button>
      <Button color="inherit" sx={{ color: (theme) => theme.palette.text.secondary }} variant="text" to="/apps/company/companies" component={Link}>
        Companies
      </Button>
      <Button color="inherit" sx={{ color: (theme) => theme.palette.text.secondary }} variant="text" to="/" component={Link}>
        About us
      </Button>
      <Box>
        <Button
          aria-label="show-jobpost-menu"
          color="inherit"
          variant="text"
          aria-controls="jobpost-menu"
          aria-haspopup="true"
          sx={{
            bgcolor: anchorEl2 ? 'primary.light' : '',
            color: anchorEl2 ? 'primary.main' : (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClick2}
          endIcon={<IconChevronDown size="15" style={{ marginLeft: '-5px', marginTop: '2px' }} />}
        >
          Job Post
        </Button>
        {/* ------------------------------------------- */}
        {/* jobpost menu Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="jobpost-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '250px',
            },
            '& .MuiMenu-paper ul': {
              p: 0,
            },
          }}
        >
          <Grid container>
            <Grid item sm={4} display="flex">
              <Box p={4} pr={0} pb={3}>
                <JobLinks />
              </Box>
            </Grid>
          </Grid>
        </Menu>
      </Box>
    </>
  );
};

export default AppDD;
