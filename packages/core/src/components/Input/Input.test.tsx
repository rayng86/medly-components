import { TestUtils } from '@medly-components/utils';
import 'jest-styled-components';
import React from 'react';
import Input from './Input';

describe('Input component', () => {
    it('should render correctly with all the props given', () => {
        const { container } = TestUtils.render(
            <Input
                type="email"
                fullWidth
                label="Email Address"
                labelPosition="vertical"
                required
                placeholder="Enter Email Address"
                description="We will never share your email with anyone"
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('should render correctly when fullWidth & required props are falsy', () => {
        const { container } = TestUtils.render(
            <Input
                type="email"
                label="Email Address"
                labelPosition="vertical"
                placeholder="Enter Email Address"
                description="We will never share your email with anyone"
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('should render correctly when label and description are not given', () => {
        const { container } = TestUtils.render(<Input type="email" placeholder="Enter Email Address" />);
        expect(container).toMatchSnapshot();
    });
});