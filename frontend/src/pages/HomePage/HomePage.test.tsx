import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from './HomePage';

describe('<HomePage />', () => {
    afterEach(cleanup);

    test('it should mount', () => {
        const { getByTestId } = render(<HomePage />);
        const homePage = getByTestId('HomePage');

        expect(homePage).toBeInTheDocument();
    });
});
