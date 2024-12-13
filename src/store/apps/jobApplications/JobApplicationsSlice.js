import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const API_URL = '/api/applications';

const initialState = { 
  applications: [],
  applicationContent: 1,
  applicationSearch: '',
  currentFilter: 'inbox',
  filters: {
    status: 'All', // e.g., "Pending", "Accepted", "Rejected"
    jobType: 'All',
  },
  applicationStatus: '', // e.g., "loading", "success", "error"
  error: '',
};

export const JobApplicationsSlice = createSlice({
  name: 'JobApplications',
  initialState,
  reducers: {
    selectApplication: (state, action) => {
      state.applicationContent = action.payload;
    },
    starApplication: (state, action) => {
      state.applications = state.applications.map((application) =>
        application._id === action.payload ? { ...application, starred: !application.starred } : application,
      );
    },
    importantApplication: (state, action) => {
      state.applications = state.applications.map((application) =>
        application._id === action.payload ? { ...application, important: !application.important } : application,
      );
    },
    checkApplication: (state, action) => {
      state.applications = state.applications.map((applications) =>
        applications.id === action.payload ? { ...applications, checked: !applications.checked } : applications,
      );
    },
    hasError(state, action) {
      state.error = action.payload?.message || action.payload || "An unknown error occurred.";
    },
    setApplicationStatus(state, action) {
      state.applicationStatus = action.payload;
    },
    setApplications(state, action) {
      state.applications = action.payload;
    },
    setFilter(state, action) {
      const { filterKey, value } = action.payload;
      state.filters[filterKey] = value;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    addApplication(state, action) {
      state.applications.push(action.payload);
    },
    deleteApplication(state, action) {
      state.applications = state.applications.filter(app => app._id !== action.payload);
    },
    updateApplicationStatus(state, action) {
      const { applicationId, status } = action.payload;
      const application = state.applications.find((app) => app._id === applicationId);
      if (application) {
        application.status = status;
      }
    },
  },
});

export const {
  selectApplication,
  hasError,
  setApplications,
  starApplication,
  importantApplication,
  checkApplication,
  setFilter,
  resetFilters,
  addApplication,
  deleteApplication, 
  updateApplicationStatus,
  setApplicationStatus,
} = JobApplicationsSlice.actions;

// Thunk to fetch applications
export const fetchApplications = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setApplications(response.data));
  } catch (error) {
    dispatch(hasError(error.response?.data || error.message));
  }
};

// Thunk to apply for a job
export const applyForJob = (applicationData) => async (dispatch, getState) => {
  const state = getState();
  const applications = state?.JobApplications?.applications || [];
  const alreadyApplied = applications.some(app => app.jobId === applicationData.jobId);

  if (alreadyApplied) {
    toast.error('You have already applied for this job.');
    return;
  }

  dispatch(setApplicationStatus('loading'));
  try {
    const response = await axios.post(`${API_URL}`, applicationData);
    dispatch(addApplication(response.data));
    dispatch(setApplicationStatus('success'));
    toast.success('Application submitted successfully.');
  } catch (error) {
    dispatch(setApplicationStatus('error'));
    dispatch(hasError(error.response?.data || error.message));
    toast.error('Failed to submit application.');
  }
};

// Thunk to delete an application
export const removeApplication = (applicationId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${applicationId}`);
    dispatch(deleteApplication(applicationId));
    toast.info('Application deleted successfully.');
  } catch (error) {
    dispatch(hasError(error.response?.data || error.message));
    toast.error('Failed to delete application.');
  }
};

// Thunk to update application status
export const changeApplicationStatus = (id, status) => async (dispatch) => {
  try {
    await axios.patch(`${API_URL}/${id}`, { status });
    dispatch(updateApplicationStatus({ applicationId: id, status }));
    toast.info(`Application status updated to ${status}.`);
  } catch (error) {
    dispatch(hasError(error.response?.data || error.message));
    toast.error('Failed to update application status.');
  }
};

export default JobApplicationsSlice.reducer;
