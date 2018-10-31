import React from 'react';
import ReactDOM from 'react-dom';
import RequiredCheckbox from './RequiredCheckbox';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const REQUIRED_PROPS = {
  };
  const div = document.createElement('div');
  ReactDOM.render(<RequiredCheckbox {...REQUIRED_PROPS} />, div);
});

it('calls the onChange event', done => {
  const PROPS = {
    onChange: jest.fn()
  }
  const component = mount(<RequiredCheckbox {...PROPS} />);

  component
    .find('.RequiredCheckbox__checkbox')
    .simulate('change',{ target: { checked: false } });

  expect(PROPS.onChange).toHaveBeenCalledTimes(1);
  expect(PROPS.onChange).lastCalledWith(false);

  component
    .find('.RequiredCheckbox__checkbox')
    .simulate('change',{ target: { checked: true } });

  expect(PROPS.onChange).toHaveBeenCalledTimes(2);
  expect(PROPS.onChange).lastCalledWith(true);
  done();
})

it('renders the message', done => {
  const PROPS = {
    message: 'test message foo bar baz'
  }
  const component = mount(<RequiredCheckbox {...PROPS} />);
  expect(component.find('.RequiredCheckbox__text').text().trim()).toMatch('test message foo bar baz');
  done();
});