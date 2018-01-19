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
  const app = mount(<App {...props} />);
  
  expect(app.find('.SignupForm').prop('action')).toMatch(props.mailchimpId);
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
