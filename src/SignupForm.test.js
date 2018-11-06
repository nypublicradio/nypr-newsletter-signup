import React from 'react';
import ReactDOM from 'react-dom';
import SignupForm from './SignupForm';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const REQUIRED_PROPS = {
    messages: {},
    action: '',
    styles: {}
  };
  const div = document.createElement('div');
  ReactDOM.render(<SignupForm {...REQUIRED_PROPS} />, div);
});

it('it passes the url to the submit method', done => {
  const PROPS = {
    action: 'http://mailchimp.com',
    messages: {},
    styles: {}
  };
  const EMAIL = 'foo@bar.com';
  const form = mount(<SignupForm {...PROPS} />);
  jest.spyOn(form.instance(), 'submit').mockImplementation(url => {
    expect(url).toEqual(PROPS.action + `&EMAIL=${encodeURIComponent(EMAIL)}`);
    done();
  });
  
  form.find('input[type="email"]').instance().value = EMAIL;
  form.find('button').simulate('click');
})
