import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertComponent = ({ open, handleClose, text, type }) => {
  const validTypes = ['error', 'info', 'success', 'warning'];
  const alertType = validTypes.includes(type) ? type : 'info'; 

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alertType}
        variant="filled"
        sx={{ width: '100%', color: 'white' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
