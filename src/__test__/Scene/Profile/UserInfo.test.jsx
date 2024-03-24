import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfilePage from '../../../Component/AddProfile/UserInfo';

describe('<ProfilePage />', () => {
  let handleInfoChangeMock;
  let showWrongMessage;

  beforeEach(() => {
    handleInfoChangeMock = jest.fn();
    showWrongMessage = false;
    render(<ProfilePage handleInfoChange={handleInfoChangeMock} showWrongMessage={showWrongMessage} />);
  });

  it('renders correctly', () => {
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('updates first name on change', () => {
    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  it('updates last name on change', () => {
    const lastNameInput = screen.getByLabelText('Last Name');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(lastNameInput.value).toBe('Doe');
  });

  it('updates email on change', () => {
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput.value).toBe('john.doe@example.com');
  });

  it('calls handleInfoChange with correct parameters', () => {
    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
    expect(handleInfoChangeMock).toHaveBeenCalledWith({ first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' });
  });

  it('displays error message when showWrongMessage is true', () => {
    render(<ProfilePage handleInfoChange={handleInfoChangeMock} showWrongMessage={true} />);
    expect(screen.getByText('Email miss or already exists')).toBeInTheDocument();
  });
});
