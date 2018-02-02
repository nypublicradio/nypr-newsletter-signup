import React, { Component } from 'react';
import './NewsletterSignup.css';
import getattr from 'safe-object';
import SignupForm from './SignupForm';

const THEMES = process.env.REACT_APP_THEMES;
const ACTION = 'https://nypublicradio.us5.list-manage.com/subscribe/post?u=4109fdd323aaac7078eadaa8f';

const FORM_PROPS = {
  messages: {
    inputPlaceholder: 'Enter your email',
    btnLabel: 'Sign Up',
    sending: 'Sending...',
  }
};

export default class NewsletterSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailchimpId: props.mailchimpId,
      headline: props.headline,
      styles: {}
    };

    let { embed } = props;
    if (embed) {
      embed.onMessage('incoming', this.listener);
    }

    if (window.dataLayer) {
      window.dataLayer.push({ mailchimpId: this.props.mailchimpId });
    }
  }

  componentDidMount() {
    let { embed } = this.props;
    if (embed) {
      embed.sendMessage('mounted');
    }
  }

  componentWillUnmount() {
    let { embed } = this.props;
    if (embed) {
      embed.remove();
    }
  }

  componentDidUpdate(props, { brand }) {
    if (this.state.brand !== brand) {
      this.updateBrand();
    }
  }

  updateBrand() {
    fetch(`${THEMES}/${this.state.brand}.json`)
      .then(r => r.json())
      .then(styles => this.setState({styles}));
  }

  style(path) {
    let parts = path.split('.');
    if (parts.length === 1) {
      // get everything nested under this path
      return this.state.styles[path];
    } else {
      // look for a specific path
      let key = parts.slice(-1);
      return { [key]: getattr(this.state, `styles.${path}`) };
    }
  }

  render() {
    let { mailchimpId, headline } = this.state;
    if (!mailchimpId && !headline) {
      return (
        <div className="NewsletterSignup">
          <p className="NewsletterSignup__placeholder">Fill out the fields and your preview will appear here</p>
        </div>
      );
    }
    FORM_PROPS.action = ACTION + `&id=${mailchimpId}`;
    return (
      <div className="NewsletterSignup" style={this.style('body')}>
        <h1 className="NewsletterSignup__headline" style={this.style('body')}>{this.state.headline || 'Stay up-to-date'}</h1>
        <SignupForm {...FORM_PROPS} buttonStyle={this.style('button')} />
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
