import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PermissionCard from '../../../Component/AddProfile/Permission'; // Update the import path as necessary

// Mocking localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('<PermissionCard />', () => {
  beforeEach(() => {
    render(<PermissionCard />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('ROLE & PERMISSIONS')).toBeInTheDocument();
  });

  it('updates state and localStorage on select change', () => {
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    const option = screen.getByText('NS ADMIN'); // Replace with actual role text
    fireEvent.click(option);

    expect(window.localStorage.getItem('role')).toBe('1'); // Check the expected localStorage value
  });

  it('should not render API_USER option', () => {
    expect(screen.queryByText('API USER')).not.toBeInTheDocument();
  });
});
