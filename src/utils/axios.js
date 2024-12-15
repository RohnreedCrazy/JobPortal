import axios from 'axios';

const axiosServices = axios.create({
  baseURL: 'http://localhost:5000', 
  timeout: 20000,  
});

// Intercept responses to handle errors
axiosServices.interceptors.response.use( 
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle server-side errors (e.g., 400, 404, 500)
      console.error('API error:', error.response.data);
    } else {
      // Handle network errors or timeouts
      console.error('Network error or timeout');
    }
    return Promise.reject(error);  // Reject the promise with the error
  }
);

export default axiosServices;


// import axios from 'axios';
// const axiosServices = axios.create();
// // interceptor for http
// axiosServices.interceptors.response.use(
//     (response) => response,
//     (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
// );

// export default axiosServices;
