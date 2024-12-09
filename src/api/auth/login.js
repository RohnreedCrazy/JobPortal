import axios from 'src/utils/axios';
import { useNavigate } from 'react-router-dom'; 

// Function to handle login
const useAuth = () => {
  const navigate = useNavigate();
 
  const signin = async (email, password) => {
    try {
      // Make the API request for login
      const response = await axios.post('/api/auth/login', { email, password });

      // Assuming the response includes the token and user data
      const { accessToken, user } = response.data;
      console.log(response.data);
      // Store the token and user info in localStorage or sessionStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Optionally, you can also store the token in sessionStorage to persist it only during the session.
      // sessionStorage.setItem('accessToken', accessToken);

      // Redirect the user to a protected route (e.g., dashboard)
      navigate('/dashboard'); // Redirect to the dashboard or any other page

    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');  
    }
  };

  return { signin };
};

export default useAuth;
