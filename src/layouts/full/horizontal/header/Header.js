import * as React from 'react';
import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import { IconMenu2 } from '@tabler/icons';
import Notifications from 'src/layouts/full/vertical/header/Notifications';
import Cart from 'src/layouts/full/vertical/header/Cart';
import Profile from 'src/layouts/full/vertical/header/Profile';
import Language from 'src/layouts/full/vertical/header/Language';
import Navigation from 'src/layouts/full/vertical/header/Navigation';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Header = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  // drawer
  const customizer = useSelector((state) => state.customizer);
  const loginedUser = JSON.parse(localStorage.getItem('user'));
  const isLogOut = localStorage.getItem('accessToken');

  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',

    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    margin: '0 auto',
    width: '100%',
    color: `${theme.palette.text.secondary} !important`,
  }));

  return (
    <AppBarStyled position="sticky" color="default" elevation={8}>
      <ToolbarStyled
        sx={{
          maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
        }}
      >
        <Box sx={{ width: lgDown ? '45px' : 'auto', overflow: 'hidden' }}>
          <Logo />
        </Box>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {lgDown ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => dispatch(toggleMobileSidebar())}
          >
            <IconMenu2 />
          </IconButton>
        ) : (
          ''
        )}
        {/* ------------------------------------------- */}
        {lgUp ? (
          <>
            <Navigation />
          </>
        ) : null}
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Language />
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          <Cart />
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          <Notifications />
          { !isLogOut ? (
            <Profile />
          ) : (
            <>
              <Button component={Link} color="primary" variant="contained" to={'/auth/login'}>
                Login
              </Button>
              <Button component={Link} color="primary" variant="outlined" to={'/auth/register'}>
                Signin
              </Button>
            </>
          )}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleSidebar: PropTypes.func,
};

export default Header;
