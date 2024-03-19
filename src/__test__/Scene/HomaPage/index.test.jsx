import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../../Scene/Homepage/index';

describe('HomePage component tests', () => {
  it('should render the component', () => {
    render(<HomePage />);
    expect(screen.getByText('WhatNow Service')).toBeInTheDocument();
  });

  it('should handle tab change', () => {
    render(<HomePage />);
    const tab = screen.getByText('NATIONAL SOCIETY');
    fireEvent.click(tab);
    expect(tab).toHaveAttribute('aria-selected', 'true');
  });

  it('should handle switch change', () => {
    render(<HomePage />);
    const switchControl = screen.getByRole('checkbox');
    expect(switchControl).not.toBeChecked();
    fireEvent.click(switchControl);
    expect(switchControl).toBeChecked();
  });

});

