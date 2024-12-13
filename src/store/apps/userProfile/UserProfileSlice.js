import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';

const API_URL = '/api/account/allUsers';

const initialState = {
  posts: [],
  followers: [],
  gallery: [],
  userProfile: {},
  notifications: [], // New state for notifications
};

export const UserProfileSlice = createSlice({
  name: 'UserPost',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    getFollowers: (state, action) => {
      state.followers = action.payload;
    },
    getPhotos: (state, action) => {
      state.gallery = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    onToggleFollow(state, action) {
      const followerId = action.payload;

      state.followers = map(state.followers, (follower) =>
        follower.id === followerId
          ? { ...follower, isFollowed: !follower.isFollowed }
          : follower
      );
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

export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPosts(response.data));
    dispatch(addNotification({ id: Date.now(), type: 'success', message: 'Posts fetched successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to fetch posts.' }));
    throw new Error(err);
  }
};

export const likePosts = (postId) => async (dispatch) => {
  try {
    const response = await axios.post('/api/data/posts/like', { postId });
    dispatch(getPosts(response.data.posts));
    dispatch(addNotification({ id: Date.now(), type: 'success', message: 'Post liked successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to like post.' }));
    throw new Error(err);
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const response = await axios.post('/api/data/posts/comments/add', { postId, comment });
    dispatch(getPosts(response.data.posts));
    dispatch(addNotification({ id: Date.now(), type: 'success', message: 'Comment added successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to add comment.' }));
    throw new Error(err);
  }
};

export const addReply = (postId, commentId, reply) => async (dispatch) => {
  try {
    const response = await axios.post('/api/data/posts/replies/add', { postId, commentId, reply });
    dispatch(getPosts(response.data.posts));
    dispatch(addNotification({ id: Date.now(), type: 'success', message: 'Reply added successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to add reply.' }));
    throw new Error(err);
  }
};

export const fetchFollowers = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/data/users`);
    dispatch(getFollowers(response.data));
    dispatch(addNotification({ id: Date.now(), type: 'success', message: 'Followers fetched successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to fetch followers.' }));
    throw new Error(err);
  }
};

export const fetchPhotos = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/data/gallery`);
    dispatch(getPhotos(response.data));
    dispatch(addNotification({ id: Date.now(), type: 'success', message: 'Gallery fetched successfully!' }));
  } catch (err) {
    dispatch(addNotification({ id: Date.now(), type: 'error', message: 'Failed to fetch gallery.' }));
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

// Selector to retrieve notifications
export const selectNotifications = (state) => state.UserPost?.notifications || [];

export default UserProfileSlice.reducer;
