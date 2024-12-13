// Unit tests for: CompanyCard

import React from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { fetchcompanyPost } from 'src/store/apps/company/companySlice';
import CompanyCard from '../companyCard';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useDispatch from react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mock fetchcompanyPost action
jest.mock('src/store/apps/company/companySlice', () => ({
  fetchcompanyPost: jest.fn(),
}));

describe('CompanyCard() CompanyCard method', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  const post = {
    companyCover: 'cover.jpg',
    companyName: 'Test Company',
    companySize: '100-500',
    comments: [{}, {}],
    category: 'Tech',
    author: {
      companyName: 'Author Company',
      companyLogo: 'logo.jpg',
    },
    createdAt: '2023-10-01T00:00:00Z',
  };

  describe('Happy Paths', () => {
    it('should render the CompanyCard with correct data', () => {
      render(
        <Router>
          <CompanyCard post={post} />
        </Router>,
      );

      expect(screen.getByAltText('green iguana')).toHaveAttribute('src', 'cover.jpg');
      expect(screen.getByText('Test Company')).toBeInTheDocument();
      expect(screen.getByText('Tech')).toBeInTheDocument();
      expect(screen.getByText('100-500')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText(format(new Date(post.createdAt), 'E, MMM d'))).toBeInTheDocument();
    });

    it('should dispatch fetchcompanyPost when company name is clicked', () => {
      render(
        <Router>
          <CompanyCard post={post} />
        </Router>,
      );

      const companyNameLink = screen.getByText('Test Company');
      fireEvent.click(companyNameLink);

      expect(dispatchMock).toHaveBeenCalledWith(fetchcompanyPost('test-company'));
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty comments array gracefully', () => {
      const postWithNoComments = { ...post, comments: [] };

      render(
        <Router>
          <CompanyCard post={postWithNoComments} />
        </Router>,
      );

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle missing companyCover gracefully', () => {
      const postWithoutCover = { ...post, companyCover: undefined };

      render(
        <Router>
          <CompanyCard post={postWithoutCover} />
        </Router>,
      );

      expect(screen.queryByAltText('green iguana')).not.toBeInTheDocument();
    });

    it('should handle missing author logo gracefully', () => {
      const postWithoutAuthorLogo = { ...post, author: { ...post.author, companyLogo: undefined } };

      render(
        <Router>
          <CompanyCard post={postWithoutAuthorLogo} />
        </Router>,
      );

      expect(screen.getByLabelText('recipe')).not.toHaveAttribute('src');
    });
  });
});

// End of unit tests for: CompanyCard
