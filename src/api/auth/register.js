import axiosServices from 'src/utils/axios';  // Ensure axiosServices is configured correctly
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const signup = async (email, password, userName, role) => {
    try {
      // Prepare registration data
      const registrationData = {
        email,
        password,
        userName,
        role,
      };
      // Make the API call to register the user
      const response = await axiosServices.post('/api/auth/register', registrationData);

      // Log the response to check the returned data
      // console.log("API response:", response);

      const { accessToken, user } = response.data;

      // Save the user info and token in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect the user to the login page after successful registration
      navigate('/auth/login'); // Adjust the path as needed

    } catch (error) {
      // Log the error to check the response
      console.error("Error during registration:", error);
      
      if (error.response) {
        console.error('API error:', error.response.data);
        throw new Error(error.response?.data?.message || 'Registration failed');
      } else {
        console.error('Network error or timeout');
        throw new Error('Network error or timeout');
      }
    }
  };

  return { signup };
};

export default useAuth;
