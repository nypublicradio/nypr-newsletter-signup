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

