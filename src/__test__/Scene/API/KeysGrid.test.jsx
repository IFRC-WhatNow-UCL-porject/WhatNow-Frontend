import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import KeyGrid from '../../../Component/API/KeysGrid';

jest.mock('../../../Component/API/KeyCard', () => (props) => (
  <div data-testid="mock-keycard">
    <div>Title: {props.title}</div>
    <div>Description: {props.description}</div>
  </div>
));

describe('<KeyGrid />', () => {
  it('renders the correct number of apps', () => {
    const mockApps = [
      { name: 'App 1', description: 'Description 1', reach: 'Reach 1', uuid: 'UUID 1' },
      { name: 'App 2', description: 'Description 2', reach: 'Reach 2', uuid: 'UUID 2' }
    ];
    render(<KeyGrid apps={mockApps} />);

    expect(screen.getByText('2 apps')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-keycard')).toHaveLength(2);
    expect(screen.getByText('Title: App 1')).toBeInTheDocument();
    expect(screen.getByText('Title: App 2')).toBeInTheDocument();
  });

  it('renders no KeyCard components when apps is empty', () => {
    render(<KeyGrid apps={[]} />);
    expect(screen.queryByTestId('mock-keycard')).not.toBeInTheDocument();
  });
});
