import React from 'react';
import ReactDOM from 'react-dom';
import NewsletterSignup from './NewsletterSignup';
import { mount } from 'enzyme';
import pym from 'pym.js';

jest.mock('pym.js');

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

describe('pym init', () => {
  pym.Parent.mockImplementation(() => {
    return {
      onMessage: jest.fn(),
      sendMessage: jest.fn(),
      remove: jest.fn()
    }
  });

  it('sets up a listener for the `incoming` message', () => {
    let embed = new pym.Parent();
    mount(<NewsletterSignup embed={embed} />);
    expect(embed.onMessage).toHaveBeenCalled();
  });

  it('it sends the `mounted` message when the component mounts', () => {
    let embed = new pym.Parent();
    mount(<NewsletterSignup embed={embed} />);
    expect(embed.sendMessage).toHaveBeenCalled();
  });
});
