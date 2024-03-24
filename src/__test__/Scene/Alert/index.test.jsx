import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AlertPopup from '../../../Component/Alert/index';

describe('<AlertPopup />', () => {
  let handleCloseMock;
  let open;
  let text;

  beforeEach(() => {
    handleCloseMock = jest.fn();
    open = true;
    text = 'Test Alert Message';
    render(<AlertPopup open={open} handleClose={handleCloseMock} text={text} />);
  });

  it('renders the dialog when open', () => {
    expect(screen.getByText('Test Alert Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CLOSE' })).toBeInTheDocument();
  });

  it('renders WarningAmberIcon', () => {
    expect(screen.getByTestId('WarningAmberIcon')).toBeInTheDocument();
  });

  it('closes the dialog when the close button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: 'CLOSE' }));
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
  
});
