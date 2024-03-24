import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch } from 'react-redux';
import KeyCard from '../../../Component/API/KeyCard';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
useDispatch.mockReturnValue(mockDispatch);

describe('<KeyCard />', () => {
  const mockProps = {
    title: 'Sample App',
    description: 'A sample description',
    reach: 100,
    detailText: 'UUID123',
    names: ['Sample App', 'Another App']
  };

  beforeEach(() => {
    render(<KeyCard {...mockProps} />);
  });

  it('renders the card with provided props', () => {
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText(`Number of predicted hits: ${mockProps.reach}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.detailText)).toBeInTheDocument();
  });

});
