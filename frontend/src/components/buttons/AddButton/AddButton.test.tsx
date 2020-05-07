import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddButton from './AddButton';

describe('<AddButton />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<AddButton />);
    const addButton = getByTestId('AddButton');

    expect(addButton).toBeInTheDocument();
  });
});