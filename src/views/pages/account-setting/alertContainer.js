import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotifications, removeNotification } from '../../../store/apps/userProfile/UserProfileSlice';
import AlertComponent from '../../../components/alert/alert';

const AlertContainer = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    // Show notifications sequentially
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications, currentNotification]);

  const handleClose = () => {
    // Remove notification and move to the next one
    dispatch(removeNotification(0)); // Remove the first notification
    setCurrentNotification(null);
  };

  useEffect(() => {
    // Set next notification if the current one was closed
    if (!currentNotification && notifications.length > 0) {
      setCurrentNotification(notifications[0]);
    }
  }, [currentNotification, notifications]);

  return (
    <div>
      {currentNotification && (
        <AlertComponent
          open={!!currentNotification}
          handleClose={handleClose}
          text={currentNotification.message}
          type={currentNotification.type}
        />
      )}
    </div>
  );
};

export default AlertContainer;
