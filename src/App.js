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
      mailchimpId: this.props.mailchimpId
    };

    if (window.dataLayer) {
      window.dataLayer.push({ mailchimpId: this.props.mailchimpId });
    }

    new pym.Child({polling: 200});
  }

  componentDidMount() {
    window.addEventListener('message', ({data, origin}) => {
      if (!TOOLKIT_ORIGIN.includes(origin) && process.env.NODE_ENV !==  'test') {
        return;
      } else {
        this.listener(data);
      }
    })
  }
  render() {
    if (!this.state.mailchimpId) {
      return (
        <div className="App">
          <p className="App__placeholder">Fill out the fields and your preview will appear here</p>
        </div>
      );
    }
    FORM_PROPS.action = ACTION + `&id=${this.state.mailchimpId}`;
    return (
      <div className="App">
        <h1 className="App__headline">Stay up-to-date</h1>
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

  listener(data) {
    let { query } = this.parse(data);
    this.setState(query);
  }
}

export default App;
