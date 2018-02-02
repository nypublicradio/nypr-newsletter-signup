import React from 'react';
import ReactDOM from 'react-dom';
import NewsletterSignup from './NewsletterSignup';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewsletterSignup />, div);
});

it('renders query params', () => {
  const props = {
    mailchimpId: 'foobarbaz'
  };
  let app = mount(<NewsletterSignup {...props} />);

  expect(app.find('.SignupForm').prop('action')).toMatch(props.mailchimpId);
  expect(app.find('.NewsletterSignup__headline').text().trim()).toMatch('Stay up-to-date');

  props.headline = 'Listen Now';
  app = mount(<NewsletterSignup {...props} />);
  expect(app.find('.NewsletterSignup__headline').text().trim()).toMatch(props.headline);
});
