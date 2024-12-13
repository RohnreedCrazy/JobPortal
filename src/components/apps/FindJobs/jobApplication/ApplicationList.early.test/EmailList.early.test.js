// Unit tests for: EmailList

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteApplication,
  fetchApplications,
  importantApplication,
  selectApplication, // Correct singular import
  starApplication,
} from 'src/store/apps/jobApplications/JobApplicationsSlice';
import ApplicationList from '../ApplicationList';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('src/store/apps/jobApplications/JobApplicationsSlice', () => ({
  fetchApplications: jest.fn(),
  selectApplication: jest.fn(),
  starApplication: jest.fn(),
  importantApplication: jest.fn(),
  deleteApplication: jest.fn(),
  checkApplication: jest.fn(),
}));

jest.mock('../ApplicationListItem', () => (props) => (
  <div data-testid="application-list-item" {...props}></div>
));

describe('EmailList() EmailList method', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'applicationsSelector') {
        return [
          { _id: '1', posterId: 'user1', id: '1', starred: false, important: false },
          { _id: '2', posterId: 'user1', id: '2', starred: true, important: true },
        ];
      }
      if (selector.name === 'activeSelector') {
        return '1';
      }
      return [];
    });
    localStorage.setItem('user', JSON.stringify({ _id: 'user1' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Tests
  it('should render the list of applications for the logged-in user', () => {
    render(<ApplicationList.EmailList showrightSidebar={jest.fn()} />);
    const items = screen.getAllByTestId('application-list-item');
    expect(items).toHaveLength(2);
  });

  it('should dispatch fetchApplications on mount', () => {
    render(<ApplicationList.EmailList showrightSidebar={jest.fn()} />);
    expect(dispatchMock).toHaveBeenCalledWith(fetchApplications());
  });

  it('should call selectApplication and showrightSidebar when an item is clicked', () => {
    const showrightSidebarMock = jest.fn();
    render(<ApplicationList.EmailList showrightSidebar={showrightSidebarMock} />);
    const items = screen.getAllByTestId('application-list-item');
    fireEvent.click(items[0]);
    expect(dispatchMock).toHaveBeenCalledWith(selectApplication('1'));
    expect(showrightSidebarMock).toHaveBeenCalled();
  });

  // Edge Case Tests
  it('should handle no applications gracefully', () => {
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'applicationsSelector') {
        return [];
      }
      return [];
    });
    render(<ApplicationList.EmailList showrightSidebar={jest.fn()} />);
    const items = screen.queryAllByTestId('application-list-item');
    expect(items).toHaveLength(0);
  });

  it('should handle invalid user data in localStorage', () => {
    localStorage.setItem('user', 'invalid');
    render(<ApplicationList.EmailList showrightSidebar={jest.fn()} />);
    const items = screen.queryAllByTestId('application-list-item');
    expect(items).toHaveLength(0);
  });

  it('should handle application actions correctly', () => {
    render(<ApplicationList.EmailList showrightSidebar={jest.fn()} />);
    const items = screen.getAllByTestId('application-list-item');
    fireEvent.click(items[0].querySelector('[onClick]'));
    expect(dispatchMock).toHaveBeenCalledWith(selectApplication('1'));
    fireEvent.click(items[0].querySelector('[onStar]'));
    expect(dispatchMock).toHaveBeenCalledWith(starApplication('1'));
    fireEvent.click(items[0].querySelector('[onImportant]'));
    expect(dispatchMock).toHaveBeenCalledWith(importantApplication('1'));
    fireEvent.click(items[0].querySelector('[onDelete]'));
    expect(dispatchMock).toHaveBeenCalledWith(deleteApplication('1'));
  });
});

// End of unit tests for: EmailList
