import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const AlertComponent = ({ open, handleClose, text, type }) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%', color: 'white' }}
      >
        <AlertTitle>{text}</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
