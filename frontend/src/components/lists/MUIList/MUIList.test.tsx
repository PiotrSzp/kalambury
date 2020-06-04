import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MUIList from './MUIList';

describe('<MUIList />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<MUIList />);
    const muiList = getByTestId('MUIList');

    expect(muiList).toBeInTheDocument();
  });
});