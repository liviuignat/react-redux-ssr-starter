import * as React from 'react';
import {shallow} from 'enzyme';
import {DashboardPage} from './../DashboardPage';

describe('GIVEN DashboardPage component', () => {
  it('SHOULD contain the expected HTML', () => {
    const wrapper = shallow(<DashboardPage message="Hello world" isChangingMessage={false} changeMessage={() => {}} />);
    expect(wrapper.find('span').html()).toEqual('<span>Hello world</span>');
  });
});
