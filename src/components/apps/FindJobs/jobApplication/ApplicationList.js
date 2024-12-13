import React, { useEffect } from 'react';
import { List, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ApplicationListItem from './ApplicationListItem';
import {
  fetchApplications,
  selectApplication,
  starApplication,
  importantApplication,
  deleteApplication,
  checkApplication,
} from 'src/store/apps/jobApplications/JobApplicationsSlice';

const ApplicationList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  //get loginedUser info.
  const loginedUser = JSON.parse(localStorage.getItem(`user`));

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const applications = useSelector((state) => state.JobApplicationsReducer.applications);
  const filter_applications = applications.filter(
    (application) => application.posterId === loginedUser._id
  )||[];

  const active = useSelector((state) => state.JobApplicationsReducer.applicationContent);

  return (
    <List>
      {filter_applications.length > 0 ? (filter_applications.map((applications) => (
        <ApplicationListItem
          key={applications._id}
          active={active}
          name = {applications.name}
          jobTitle={applications.jobtitle}
          appliedAt={applications.appliedAt}
          statue = {applications.status}
          onClick={() => {
            dispatch(selectApplication(applications)); 
            showrightSidebar();
          }}
          onDelete={() => dispatch(deleteApplication(applications._id))}
          isSelected={applications._id === active}
          onStar={() => dispatch(starApplication(applications._id))}
          onImportant={() => dispatch(importantApplication(applications._id))}
          onChange={(e) => {
            if (e.target.checked) dispatch(checkApplication(applications._id, 'checked'));
            else dispatch(checkApplication(applications._id, 'unchecked'));
          }}
        />
      ))):(
        <Typography>No Applications</Typography>
      )}
    </List>
  );
};

export default ApplicationList;
