import axios from 'src/utils/axios'; // Your real axios instance

// Login function
const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });

    const { accessToken, user } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, accessToken, user };
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    return { success: false, message: error.response?.data?.message || 'Internal server error' };
  }
};

// Register function
const register = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/register', { email, password });

    const { accessToken, user } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, accessToken, user };
  } catch (error) {
    console.error('Registration failed:', error.response?.data?.message || error.message);
    return { success: false, message: error.response?.data?.message || 'Internal server error' };
  }
};

// Fetch user data
const getUserData = async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return { success: false, message: 'Authorization token missing' };
  }

  try {
    const response = await axios.get('/api/account/my-account', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return { success: true, user: response.data.user };
  } catch (error) {
    console.error('Failed to fetch user data:', error.response?.data?.message || error.message);
    return { success: false, message: error.response?.data?.message || 'Internal server error' };
  }
};
