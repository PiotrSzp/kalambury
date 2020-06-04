import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from './Game';

describe('<Game />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Game />);
    const game = getByTestId('Game');

    expect(game).toBeInTheDocument();
  });
});