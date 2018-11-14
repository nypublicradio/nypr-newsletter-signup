import React from 'react';
import './NewsletterSignup.css';
import SignupForm from './SignupForm';
import WidgetBase from 'nypr-widget-base';
import sanitizeHtml from 'sanitize-html';

const ACTION = 'https://nypublicradio.us5.list-manage.com/subscribe/post?u=4109fdd323aaac7078eadaa8f';

const FORM_PROPS = {
  messages: {
    inputPlaceholder: 'Enter your email',
    btnLabel: 'Sign Up',
    sending: 'Sending...',
  }
};

const LEGAL_TEXT_FOR_PARTNER = {
  'None': `By submitting your information, you're agreeing to receive communications from New York Public Radio in accordance with our <a href="https://www.wnyc.org/terms/" target="_blank" rel="noopener">Terms of Use</a>.`,
  'ProPublica': `By submitting your information, you're agreeing to receive communications from New York Public Radio in accordance with our <a href="https://www.wnyc.org/terms/" target="_blank" rel="noopener">Terms of Use</a> and in accordance with the <a href="https://www.propublica.org/legal/" target="_blank" rel="noopener">Privacy Policy</a> of ProPublica.`,
}

const linkify = function(text) {
  // sanitize html coming from the embed string
  let cleanText = sanitizeHtml(text, {allowedTags: [], allowedAttributes: []});
  let urlMatcher = new RegExp("(\\s?)((http|https)://[^\\s<]+[^\\s<.)])", "gim");
  let results = cleanText.replace(urlMatcher, (match, whitespace, url) => {
    return `${whitespace}<a href="${encodeURI(url)}" target="_blank" rel="noopener">${url}</a>`;
  });
  return results;
}

export default class NewsletterSignup extends WidgetBase {
  constructor(props) {
    super(props);

    if (window.dataLayer) {
      window.dataLayer.push({mailchimpId: this.props.mailchimpId});
      if (this.props.mailchimpName) {
        window.dataLayer.push({mailchimpName: this.props.mailchimpName});
      }
    }
  }

  render() {
    let { mailchimpId, headline, partnerOrg='None', legalText=''} = this.state;

    let legalMessage;
    if (partnerOrg === 'Other') {
      legalMessage = linkify(legalText);
    } else if (LEGAL_TEXT_FOR_PARTNER[partnerOrg]) {
      legalMessage = LEGAL_TEXT_FOR_PARTNER[partnerOrg];
    } else {
      legalMessage = LEGAL_TEXT_FOR_PARTNER['None'];
    }

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
          <SignupForm {...FORM_PROPS} buttonStyle={this.style('button')} legalMessage={legalMessage} />
        </div>
      </div>
    );
  }
}
