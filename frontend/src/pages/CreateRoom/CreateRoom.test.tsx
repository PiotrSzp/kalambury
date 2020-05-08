import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateRoom from './CreateRoom';

describe('<CreateRoom />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<CreateRoom />);
    const createRoom = getByTestId('CreateRoom');

    expect(createRoom).toBeInTheDocument();
  });
});