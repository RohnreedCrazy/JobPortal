import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/account/allUsers';

const initialState = {
  users: [],
  userProfile: {},
  notifications: [], // New state for notifications
};

export const UserProfileSlice = createSlice({
  name: 'UserPost',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const {
  getPosts,
  getFollowers,
  onToggleFollow,
  getPhotos,
  updateUserProfile,
  addNotification,
  removeNotification,
} = UserProfileSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPosts(response.data));
    dispatch(addNotification({ id: Date.now(), type: 'success', message: 'Posts fetched successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to fetch users.' }));
    throw new Error(err);
  }
};
export const updateUser = (userId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/data/users/${userId}`, updatedData);
    dispatch(updateUserProfile(response.data));
    dispatch(addNotification({ id: Date.now(), type: 'success', message: 'Profile updated successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to update profile.' }));
    throw new Error(err);
  }
};
export const addUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/data/users', userData);
    dispatch(addUser(response.data));
    dispatch(addNotification({ id: Date.now(), type:'success', message: 'User added successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to add user.' }));
    throw new Error(err);
  }
};
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/data/users/${userId}`);
    dispatch(addNotification({ id: Date.now(), type:'success', message: 'User deleted successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to delete user.' }));
    throw new Error(err);
  }
};

// Selector to retrieve notifications
export const selectNotifications = (state) => state.UserPost?.notifications || [];

export default UserProfileSlice.reducer;
