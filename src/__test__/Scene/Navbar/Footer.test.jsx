import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../../Component/Navigator/Footer';

describe('<Footer />', () => {
  it('renders the footer with all elements', () => {
    render(<Footer />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
  });

  it('navigates to correct links when clicked', () => {
    render(<Footer />);

    delete window.location;
    window.location = { href: '' };

    fireEvent.click(screen.getByText('Terms of Service'));
    expect(window.location.href).toBe('/terms_and_conditions');

    fireEvent.click(screen.getByText('Privacy'));
    expect(window.location.href).toBe('https://www.preparecenter.org/content/privacy-policy');

    fireEvent.click(screen.getByText('Feedback'));
    expect(window.location.href).toBe('https://docs.google.com/forms/d/1ZgPYoInWaKbMrbhKBb2daPAbxXPq1NrHVNy7O3MAceU/');
  });

});
