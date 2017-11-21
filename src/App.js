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
  },
  styles: {
    sending: {
      fontSize: 14,
      color: "auto"
    },
    success: {
      fontSize: 14,
      color: "black"
    },
    error: {
      fontSize: 14,
      color: "black"
    }
  },
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailchimpId: this.props.mailchimpId
    };
    
    new pym.Child({polling: 200});
  }
  
  componentDidMount() {
    window.addEventListener('message', ({data, origin}) => {
      if (origin !== process.env.REACT_APP_TOOLKIT_ORIGIN && process.env.NODE_ENV !==  'test') {
        return;
      } else {
        this.listener(data);
      }
    })
  }
  render() {
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
