import React from 'react';
import './NewsletterSignup.css';
import SignupForm from './SignupForm';
import WidgetBase from 'nypr-widget-base';

const ACTION = 'https://nypublicradio.us5.list-manage.com/subscribe/post?u=4109fdd323aaac7078eadaa8f';

const FORM_PROPS = {
  messages: {
    inputPlaceholder: 'Enter your email',
    btnLabel: 'Sign Up',
    sending: 'Sending...',
  }
};

export default class NewsletterSignup extends WidgetBase {
  constructor(props) {
    super(props);

    if (window.dataLayer) {
      window.dataLayer.push({ mailchimpId: this.props.mailchimpId });
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
        <div className="NewsletterSignup__wrapper">
          <span className="NewsletterSignup__accent" style={this.style('accent')}></span>
          <h1 className="NewsletterSignup__headline" style={this.style('h1')}>{this.state.headline || 'Stay up-to-date'}</h1>
          <SignupForm {...FORM_PROPS} buttonStyle={this.style('button')} />
        </div>
      </div>
    );
  }
}
