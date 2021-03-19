import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from 'components';

it('expect to render the Loader component', () => {
  expect(shallow(<Loader />)).toMatchSnapshot();
});
