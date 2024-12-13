// Unit tests for: JobApplicationsSlice

import axios from '../../../../utils/axios';
import {
  addApplication,
  addNotification,
  applyForJob,
  changeApplicationStatus,
  checkApplication,
  deleteApplication,
  fetchApplications,
  importantApplication,
  removeApplication,
  removeNotification,
  resetFilters,
  selectFilteredApplications,
  selectNotifications,
  setApplications,
  setFilter,
  starApplication,
  updateApplicationStatus,
} from '../JobApplicationsSlice';

import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('JobApplicationsSlice() JobApplicationsSlice method', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { JobApplications: reducer } });
  });

  // Happy Path Tests
  describe('Happy Path Tests', () => {
    it('should select an application', () => {
      const applicationId = 2;
      store.dispatch(selectApplication(applicationId));
      const state = store.getState().JobApplications;
      expect(state.applicationContent).toBe(applicationId);
    });

    it('should star an application', () => {
      const initialState = {
        applications: [{ _id: '1', starred: false }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      store.dispatch(starApplication('1'));
      const state = store.getState().JobApplications;
      expect(state.applications[0].starred).toBe(true);
    });

    it('should mark an application as important', () => {
      const initialState = {
        applications: [{ _id: '1', important: false }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      store.dispatch(importantApplication('1'));
      const state = store.getState().JobApplications;
      expect(state.applications[0].important).toBe(true);
    });

    it('should check an application', () => {
      const initialState = {
        applications: [{ id: '1', checked: false }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      store.dispatch(checkApplication('1'));
      const state = store.getState().JobApplications;
      expect(state.applications[0].checked).toBe(true);
    });

    it('should set applications', () => {
      const applications = [{ id: '1' }, { id: '2' }];
      store.dispatch(setApplications(applications));
      const state = store.getState().JobApplications;
      expect(state.applications).toEqual(applications);
    });

    it('should set a filter', () => {
      const filter = { filterKey: 'status', value: 'Pending' };
      store.dispatch(setFilter(filter));
      const state = store.getState().JobApplications;
      expect(state.filters.status).toBe('Pending');
    });

    it('should reset filters', () => {
      store.dispatch(resetFilters());
      const state = store.getState().JobApplications;
      expect(state.filters).toEqual({ status: 'All', jobType: 'All' });
    });

    it('should add an application', () => {
      const application = { id: '3' };
      store.dispatch(addApplication(application));
      const state = store.getState().JobApplications;
      expect(state.applications).toContainEqual(application);
    });

    it('should delete an application', () => {
      const initialState = {
        applications: [{ id: '1' }, { id: '2' }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      store.dispatch(deleteApplication('1'));
      const state = store.getState().JobApplications;
      expect(state.applications).toHaveLength(1);
      expect(state.applications[0].id).toBe('2');
    });

    it('should update application status', () => {
      const initialState = {
        applications: [{ id: '1', status: 'Pending' }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      store.dispatch(updateApplicationStatus({ applicationId: '1', status: 'Accepted' }));
      const state = store.getState().JobApplications;
      expect(state.applications[0].status).toBe('Accepted');
    });

    it('should add a notification', () => {
      const notification = { type: 'info', message: 'Test notification' };
      store.dispatch(addNotification(notification));
      const state = store.getState().JobApplications;
      expect(state.notifications).toContainEqual(notification);
    });

    it('should remove a notification', () => {
      const initialState = {
        notifications: [{ type: 'info', message: 'Test notification' }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      store.dispatch(removeNotification(0));
      const state = store.getState().JobApplications;
      expect(state.notifications).toHaveLength(0);
    });

    it('should fetch applications successfully', async () => {
      const applications = [{ id: '1' }, { id: '2' }];
      mockAxios.onGet('/api/applications').reply(200, applications);

      await store.dispatch(fetchApplications());
      const state = store.getState().JobApplications;
      expect(state.applications).toEqual(applications);
    });

    it('should apply for a job successfully', async () => {
      const applicationData = { jobId: '1', applicantName: 'John Doe' };
      const responseData = { id: '3', ...applicationData };
      mockAxios.onPost('/api/applications').reply(200, responseData);

      await store.dispatch(applyForJob(applicationData));
      const state = store.getState().JobApplications;
      expect(state.applications).toContainEqual(responseData);
      expect(state.applicationStatus).toBe('success');
    });

    it('should remove an application successfully', async () => {
      const initialState = {
        applications: [{ id: '1' }, { id: '2' }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      mockAxios.onDelete('/api/applications/1').reply(200);

      await store.dispatch(removeApplication('1'));
      const state = store.getState().JobApplications;
      expect(state.applications).toHaveLength(1);
      expect(state.applications[0].id).toBe('2');
    });

    it('should change application status successfully', async () => {
      const initialState = {
        applications: [{ id: '1', status: 'Pending' }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      mockAxios.onPatch('/api/applications/1').reply(200);

      await store.dispatch(changeApplicationStatus('1', 'Accepted'));
      const state = store.getState().JobApplications;
      expect(state.applications[0].status).toBe('Accepted');
    });

    it('should select filtered applications', () => {
      const initialState = {
        applications: [
          { id: '1', status: 'Pending', jobType: 'Full-time' },
          { id: '2', status: 'Accepted', jobType: 'Part-time' },
        ],
        filters: { status: 'Pending', jobType: 'All' },
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      const filteredApplications = selectFilteredApplications(store.getState());
      expect(filteredApplications).toHaveLength(1);
      expect(filteredApplications[0].id).toBe('1');
    });

    it('should select notifications', () => {
      const initialState = {
        notifications: [{ type: 'info', message: 'Test notification' }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      const notifications = selectNotifications(store.getState());
      expect(notifications).toHaveLength(1);
      expect(notifications[0].message).toBe('Test notification');
    });
  });

  // Edge Case Tests
  describe('Edge Case Tests', () => {
    it('should handle error when fetching applications fails', async () => {
      mockAxios.onGet('/api/applications').reply(500, 'Internal Server Error');

      await store.dispatch(fetchApplications());
      const state = store.getState().JobApplications;
      expect(state.error).toBe('Internal Server Error');
    });

    it('should handle error when applying for a job that already exists', async () => {
      const initialState = {
        applications: [{ jobId: '1' }],
      };
      store = configureStore({
        reducer: { JobApplications: reducer },
        preloadedState: { JobApplications: initialState },
      });
      const applicationData = { jobId: '1', applicantName: 'John Doe' };

      await store.dispatch(applyForJob(applicationData));
      const state = store.getState().JobApplications;
      expect(state.error).toBe('You have already applied for this job.');
    });

    it('should handle error when removing an application fails', async () => {
      mockAxios.onDelete('/api/applications/1').reply(500, 'Internal Server Error');

      await store.dispatch(removeApplication('1'));
      const state = store.getState().JobApplications;
      expect(state.error).toBe('Internal Server Error');
    });

    it('should handle error when changing application status fails', async () => {
      mockAxios.onPatch('/api/applications/1').reply(500, 'Internal Server Error');

      await store.dispatch(changeApplicationStatus('1', 'Accepted'));
      const state = store.getState().JobApplications;
      expect(state.error).toBe('Internal Server Error');
    });
  });
});

// End of unit tests for: JobApplicationsSlice
