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

const linkify = function(text) {
  // sanitize html coming from the embed string
  let cleanText = sanitizeHtml(text, {allowedTags: [], allowedAttributes: []});
  // inject a tags for our links
  let officialLinks = [
    {
     tag:   '{WNYC_TERMS}',
     title: 'Terms of Use',
     url:   'https://www.wnyc.org/terms/'
    }, {
     tag:   '{PROPUBLICA_PRIVACY}',
     title: 'Privacy Policy',
     url:   'https://www.propublica.org/legal/'
    }
  ];
  let urlMatcher = new RegExp("(\\s?)((http|https)://[^\\s<]+[^\\s<.)])", "gim");
  let results = cleanText.replace(urlMatcher, (match, whitespace, url) => {
    return `${whitespace}<a href="${encodeURI(url)}" target="_blank" rel="noopener">${url}</a>`;
  });
  officialLinks.forEach(({tag, title, url}) => {
    results = results.replace(tag, `<a href="${url}" target="_blank" rel="noopener">${title}</a>`)
  })
  return results
}

export default class NewsletterSignup extends WidgetBase {
  constructor(props) {
    super(props);

    if (window.dataLayer) {
      window.dataLayer.push({ mailchimpId: this.props.mailchimpId });
    }
  }

  render() {
    let defaultLegalText = "By submitting your information, you're agreeing to receive communications from New York Public Radio in accordance with our {WNYC_TERMS}.";
    let { mailchimpId, headline, optIn, legalText} = this.state;
    let usingCustomText = optIn;
    legalText = !legalText && !usingCustomText ? defaultLegalText : legalText;
    console.log('lt', typeof legalText);
    let legalMessage = linkify(legalText);

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
