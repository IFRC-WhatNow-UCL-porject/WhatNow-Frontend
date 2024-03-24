import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from '../../../Component/Navigator/SideBar';

describe('<SideBar />', () => {
  const mockHandleMouseEnter = jest.fn();
  const mockHandleMouseLeave = jest.fn();
  const mockText = {
    'Tab 1': '/path1',
    'Tab 2': '/path2',
    // Add more tabs as necessary
  };
  const appBarHeight = '64px'; // Mocked app bar height

  it('renders with correct styles and tabs', () => {
    render(<SideBar show={true} handleMouseEnter={mockHandleMouseEnter} handleMouseLeave={mockHandleMouseLeave} appBarHeight={appBarHeight} text={mockText} />);
    
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('handles mouse enter and leave events', () => {
    render(<SideBar show={true} handleMouseEnter={mockHandleMouseEnter} handleMouseLeave={mockHandleMouseLeave} appBarHeight={appBarHeight} text={mockText} />);

    fireEvent.mouseEnter(screen.getByText('Tab 1'));
    expect(mockHandleMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(screen.getByText('Tab 1'));
    expect(mockHandleMouseLeave).toHaveBeenCalled();
  });

});
