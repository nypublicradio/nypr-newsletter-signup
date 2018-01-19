import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders query params', () => {
  const props = {
    mailchimpId: 'foobarbaz'
  };
  let app = mount(<App {...props} />);

  expect(app.find('.SignupForm').prop('action')).toMatch(props.mailchimpId);
  expect(app.find('.App__headline').text().trim()).toMatch('Stay up-to-date');

  props.headline = 'Listen Now';
  app = mount(<App {...props} />);
  expect(app.find('.App__headline').text().trim()).toMatch(props.headline);
});

it('responds to postMessage', done => {
  const props = {
    mailchimpId: 'foobarbaz'
  };
  const app = mount(<App />);
  jest.spyOn(app.instance(), 'listener').mockImplementation(data => {
    expect(data).toEqual(JSON.stringify(props));
    done();
  });

  window.postMessage(JSON.stringify(props), '*');
});
