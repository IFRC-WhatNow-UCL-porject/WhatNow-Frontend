import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SocietyPaper from '../../../Component/AddProfile/Society';
import { store } from '../../../store/index';

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

describe('<SocietyPaper />', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SocietyPaper user_id={123} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    expect(screen.getByText('SOCIETIES')).toBeInTheDocument();
    expect(screen.getByText('Add New Society')).toBeInTheDocument();
  });

});
