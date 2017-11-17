import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders query params', () => {
  const props = {
    headline: 'foo',
    summary: 'bar',
    callToAction: 'baz',
    url: 'http://buz.com'
  };
  const app = shallow(<App {...props} />);
  
  expect(app.find('.App__headline').text()).toEqual(props.headline);
  expect(app.find('.App__summary').text()).toEqual(props.summary);
  expect(app.find('.App__call-out').text()).toEqual(props.callToAction);
  expect(app.find('.App__call-out').prop('href')).toEqual(props.url);
});

it('responds to postMessage', done => {
  const props = {
    headline: 'foo',
    summary: 'bar',
    callToAction: 'baz',
    url: 'http://buz.com'
  };
  const app = shallow(<App />);
  jest.spyOn(app.instance(), 'listener').mockImplementation(data => {
    expect(data).toEqual(JSON.stringify(props));
    done();
  });
  
  window.postMessage(JSON.stringify(props), '*');
});

it('shows a preview message', () => {
  const app = shallow(<App />);
  expect(app.find('.App__placeholder').text()).toEqual('Fill out the fields and your preview will appear here');
})
