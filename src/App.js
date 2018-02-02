import React, { Component } from 'react';
import './App.css';
import SignupForm from './SignupForm';
import pym from 'pym.js';

const ACTION = 'https://nypublicradio.us5.list-manage.com/subscribe/post?u=4109fdd323aaac7078eadaa8f';

const FORM_PROPS = {
  messages: {
    inputPlaceholder: 'Enter your email',
    btnLabel: 'Sign Up',
    sending: 'Sending...',
  }
};

const TOOLKIT_ORIGIN = [process.env.REACT_APP_TOOLKIT_ORIGIN];
// open up postmessage on demo to ease development
if (process.env.REACT_APP_BUILD === 'demo') {
  TOOLKIT_ORIGIN.push('http://localhost:4200');
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailchimpId: props.mailchimpId,
      headline: props.headline
    };
    props.embed.onMessage('incoming', this.listener);

    if (window.dataLayer) {
      window.dataLayer.push({ mailchimpId: this.props.mailchimpId });
    }

    new pym.Child({polling: 200});
  }

  componentDidMount() {
  }
  render() {
    let { mailchimpId, headline } = this.state;
    if (!mailchimpId && !headline) {
      return (
        <div className="App">
          <p className="App__placeholder">Fill out the fields and your preview will appear here</p>
        </div>
      );
    }
    FORM_PROPS.action = ACTION + `&id=${mailchimpId}`;
    return (
      <div className="App">
        <h1 className="App__headline">{this.state.headline || 'Stay up-to-date'}</h1>
        <SignupForm {...FORM_PROPS} />
      </div>
    );
  }

  parse(data) {
    let message = {};
    if (typeof data === 'string') {
      try {
        message = JSON.parse(data);
      } catch(e) {/* Ignored */}
    }
    return message;
  }

  listener = data => {
    let query = this.parse(data);
    this.setState(query);
  }
}

export default App;
