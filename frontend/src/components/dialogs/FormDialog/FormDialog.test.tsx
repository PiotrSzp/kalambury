import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormDialog from './FormDialog';

describe('<FormDialog />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<FormDialog />);
    const formDialog = getByTestId('FormDialog');

    expect(formDialog).toBeInTheDocument();
  });
});