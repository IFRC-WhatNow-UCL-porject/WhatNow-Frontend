import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApiList from '../../../Component/ApisStats/ApiList';

describe('<ApiList />', () => {
  const mockApiList = [
    { user_name: 'User1', organization: 'Org1', location: 'Loc1', name: 'App1', hits: 100, reach: 200 },
    { user_name: 'User2', organization: 'Org2', location: 'Loc2', name: 'App2', hits: 200, reach: 300 },
    { user_name: 'User3', organization: 'Org3', location: 'Loc3', name: 'App3', hits: 300, reach: 400 },
  ];

  beforeEach(() => {
    render(<ApiList apiList={mockApiList} />);
  });

  it('renders table with correct data', () => {
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('Org1')).toBeInTheDocument();
  });

});
