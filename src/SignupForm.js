import React, { Component } from "react"
import RequiredCheckbox from './RequiredCheckbox';
import jsonp from "jsonp"
import './SignupForm.css';


// mailchimp will return an HTML string for certain user states
// this takes a string and turns it into HTML nodes with links
// that open in a new window
function formatLinks(msg) {
  try {
    let dom = document.createRange().createContextualFragment(msg);
    var links = dom.querySelectorAll("a");
    links.forEach(function(link) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    });
    let div = document.createElement("div");
    div.appendChild(dom);
    return div.innerHTML;
  } catch (e) {
    return msg;
  }
}

class SubscribeForm extends Component {
  state = {
    checkboxChecked: true,
    submitTried: false,
    status: null,
    msg: null
  }

  onSubmit = e => {
    e.preventDefault()

    this.setState({submitTried: true});

    // basic validations
    // we can rely on mailchimp's email validation, but this is quick sanity check
    if (!this.input.value) {
      this.setState({
        status: 'error',
        msg: 'Your email is required.'
      });
      return;
    } else if (!this.input.value.includes('@')) {
      this.setState({
        status: 'error',
        msg: 'Must be a valid email address.'
      });
      return;
    } else if (!this.state.checkboxChecked) {
      return;
    }

    const url = `${this.props.action}&EMAIL=${encodeURIComponent(this.input.value)}`;

    this.setState({ status: "sending", msg: null }, this.submit.bind(this, url));
  }

  handleCheckboxChange = checked => {
    this.setState({checkboxChecked: checked});
  }

  // the mailchimp REST API's permissions are wide-open read/write, so we don't want it exposed in the browser
  // the endpoint does accept json-p, so let's use that instead of exposing a superuser API key to the world
  submit(url) {
    jsonp(url, {param: "c", timeout: 2000}, (err, {result, msg} = {}) => {
      if (err) {
        let msg = err.message === 'Timeout' ? 'Looks like this Mailchimp ID is invalid. Please try again.' : err;
        this.setState({
          status: 'error',
          msg
        });
      } else if (result !== 'success') {
        // set any embedded link tags to open in a new window
        // e.g. update your subscription preferences
        let formattedMsg = formatLinks(msg);
        // sometimes the response comes with an error code at the start
        formattedMsg = formattedMsg.replace(/^\d - /, '');
        this.setState({
          status: 'error',
          msg: formattedMsg
        });
      } else {
        this.setState({
          status: 'success',
          msg
        });
      }
    });
  }

  render() {
    const { action, messages, legalMessage } = this.props;
    const { status, msg, checkboxChecked, submitTried } = this.state;
    const isDisabled = !checkboxChecked;
    return (
      <form className={`SignupForm${status ? ' SignupForm--extend' : ''}`} action={action} method="post" noValidate>
        <input
          ref={node => (this.input = node)}
          type="email"
          defaultValue=""
          name="EMAIL"
          required={true}
          placeholder={messages.inputPlaceholder}
        />
        <button
          style={this.props.buttonStyle}
          className={`gtm__newsletter ${isDisabled ? 'disabled' : ''}`}
          disabled={this.state.status === "sending"}
          onClick={this.onSubmit}
          type="submit"
        >
          {messages.btnLabel}
        </button>
        {msg &&
          <p className="SignupForm__message" dangerouslySetInnerHTML={ {__html: messages[status] || msg } } />
        }
        <RequiredCheckbox
          message={legalMessage}
          onChange={this.handleCheckboxChange}
          submitTried={submitTried}
          checked={true}
          error="You must agree to the terms." />
      </form>
    );
  }
}

export default SubscribeForm
