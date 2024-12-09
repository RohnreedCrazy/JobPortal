import axios from 'src/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyposts: [],
  recentPosts: [],
  companySearch: '',
  sortBy: 'newest',
  selectedPost: null, 
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.companyposts = action.payload;
    },
    getPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { getPosts, getPost } = companySlice.actions;

export const fetchcompanyPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/data/company/companyPosts');
    dispatch(getPosts(response.data));
  } catch (err) {
    throw new Error();
  }
};
export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const response = await axios.post('/api/data/company/post/add', { postId, comment });
    dispatch(getPosts(response.data.posts));
  } catch (err) {
    throw new Error(err);
  }
};
export const fetchcompanyPost = (title) => async (dispatch) => {
  try {
    const response = await axios.post('/api/data/company/post', { title });
    dispatch(getPost(response.data.post));
  } catch (err) {
    throw new Error(err);
  }
};
export default companySlice.reducer;
