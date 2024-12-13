// Unit tests for: handleLogin

import apiList from '../apiList';
import { handleLogin } from '../authService';

jest.mock('../axiosInstance');

describe('handleLogin() handleLogin method', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    axiosInstance.post.mockClear();
    localStorage.clear();
  });

  describe('Happy Paths', () => {
    it('should store the token in localStorage and return token and user data on successful login', async () => {
      // Arrange
      const credentials = { username: 'testuser', password: 'password123' };
      const mockResponse = {
        data: {
          token: 'mockToken123',
          user: { id: 1, name: 'Test User' },
        },
      };
      axiosInstance.post.mockResolvedValue(mockResponse);

      // Act
      const result = await handleLogin(credentials);

      // Assert
      expect(axiosInstance.post).toHaveBeenCalledWith(apiList.login, credentials);
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken123');
      expect(result).toEqual({ token: 'mockToken123', user: { id: 1, name: 'Test User' } });
    });
  });

  describe('Edge Cases', () => {
    it('should throw an error if the API call fails', async () => {
      // Arrange
      const credentials = { username: 'testuser', password: 'wrongpassword' };
      const mockError = new Error('Invalid credentials');
      axiosInstance.post.mockRejectedValue(mockError);

      // Act & Assert
      await expect(handleLogin(credentials)).rejects.toThrow('Invalid credentials');
      expect(axiosInstance.post).toHaveBeenCalledWith(apiList.login, credentials);
    });

    it('should handle missing token in response gracefully', async () => {
      // Arrange
      const credentials = { username: 'testuser', password: 'password123' };
      const mockResponse = {
        data: {
          user: { id: 1, name: 'Test User' },
        },
      };
      axiosInstance.post.mockResolvedValue(mockResponse);

      // Act
      const result = await handleLogin(credentials);

      // Assert
      expect(axiosInstance.post).toHaveBeenCalledWith(apiList.login, credentials);
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(result).toEqual({ token: undefined, user: { id: 1, name: 'Test User' } });
    });

    it('should handle empty credentials gracefully', async () => {
      // Arrange
      const credentials = {};
      const mockError = new Error('Request failed with status code 400');
      axiosInstance.post.mockRejectedValue(mockError);

      // Act & Assert
      await expect(handleLogin(credentials)).rejects.toThrow('Request failed with status code 400');
      expect(axiosInstance.post).toHaveBeenCalledWith(apiList.login, credentials);
    });
  });
});

// End of unit tests for: handleLogin
