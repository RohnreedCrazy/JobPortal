// Unit tests for: Landingpage

import React from 'react';
import Landingpage from '../Landingpage';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mocking components
jest.mock('src/components/container/PageContainer', () => {
  return ({ children }) => <div data-testid="PageContainer">{children}</div>;
});
jest.mock('../../../../components/landingpage/banner/Banner', () => () => (
  <div data-testid="Banner" />
));
jest.mock('../../../../components/landingpage/c2a/C2a', () => () => <div data-testid="C2a" />);
jest.mock('../../../../components/landingpage/c2a/C2a2', () => () => <div data-testid="C2a2" />);
jest.mock('../../../../components/landingpage/demo-slider/DemoSlider', () => () => (
  <div data-testid="DemoSlider" />
));
jest.mock('../../../../components/landingpage/features/Features', () => () => (
  <div data-testid="Features" />
));
jest.mock('../../../../components/landingpage/footer/Footer', () => () => (
  <div data-testid="Footer" />
));
jest.mock('../../../../components/landingpage/frameworks/Frameworks', () => () => (
  <div data-testid="Frameworks" />
));
jest.mock('../../../../components/landingpage/header/Header', () => () => (
  <div data-testid="LpHeader" />
));
jest.mock('../../../../components/landingpage/testimonial/Testimonial', () => () => (
  <div data-testid="Testimonial" />
));

describe('Landingpage() Landingpage method', () => {
  // Happy path tests
  describe('Happy Paths', () => {
    it('should render the Landingpage component with all sections', () => {
      // Render the Landingpage component
      render(<Landingpage />);

      // Assert that all sections are rendered
      expect(screen.getByTestId('PageContainer')).toBeInTheDocument();
      expect(screen.getByTestId('LpHeader')).toBeInTheDocument();
      expect(screen.getByTestId('Banner')).toBeInTheDocument();
      expect(screen.getByTestId('DemoSlider')).toBeInTheDocument();
      expect(screen.getByTestId('Frameworks')).toBeInTheDocument();
      expect(screen.getByTestId('Testimonial')).toBeInTheDocument();
      expect(screen.getByTestId('Features')).toBeInTheDocument();
      expect(screen.getByTestId('C2a')).toBeInTheDocument();
      expect(screen.getByTestId('C2a2')).toBeInTheDocument();
      expect(screen.getByTestId('Footer')).toBeInTheDocument();
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should handle missing components gracefully', () => {
      // Mock a component to return null
      jest.mock('../../../../components/landingpage/banner/Banner', () => () => null);

      // Render the Landingpage component
      render(<Landingpage />);

      // Assert that the component still renders other sections
      expect(screen.getByTestId('PageContainer')).toBeInTheDocument();
      expect(screen.queryByTestId('Banner')).not.toBeInTheDocument();
      expect(screen.getByTestId('DemoSlider')).toBeInTheDocument();
    });
  });
});

// End of unit tests for: Landingpage
