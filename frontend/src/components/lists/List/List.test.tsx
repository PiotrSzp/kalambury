import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import List from './List';

describe('<List />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<List />);
    const list = getByTestId('List');

    expect(list).toBeInTheDocument();
  });
});