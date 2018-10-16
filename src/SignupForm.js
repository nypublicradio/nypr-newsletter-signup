import React, { Component } from "react"
import jsonp from "jsonp"
import './SignupForm.css';

const getAjaxUrl = url => url.replace('/post?', '/post-json?')

function formatLinks(msg) {
  try {
    let dom = document.createRange().createContextualFragment(msg);
    var links = dom.querySelectorAll("a");
    links.forEach(function(link) {
      link.setAttribute('target', '_blank');
    });
    let div=document.createElement("div");
    div.appendChild(dom);
    return div.innerHTML;
  } catch (e) {
    return msg;
  }
}

class SubscribeForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: null,
      msg: null
    }
  }
  onSubmit = e => {
    e.preventDefault()

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
    }

    const url = getAjaxUrl(this.props.action) + `&EMAIL=${encodeURIComponent(this.input.value)}`;

    this.setState({ status: "sending", msg: null }, this.submit.bind(this, url));
  }

  submit(url) {
    jsonp(url, {param: "c", timeout: 2000}, (err, {result, msg} = {}) => {
      if (err) {
        let msg = err.message === 'Timeout' ? 'Looks like this Mailchimp ID is invalid. Please try again.' : err;
        this.setState({
          status: 'error',
          msg
        });
      } else if (result !== 'success') {
        let formattedMsg = formatLinks(msg);
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
    const { action, messages } = this.props
    const { status, msg } = this.state
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
          className="gtm__newsletter"
          disabled={this.state.status === "sending"}
          onClick={this.onSubmit}
          type="submit"
        >
          {messages.btnLabel}
        </button>
        <p className="SignupForm__message" dangerouslySetInnerHTML={ {__html: messages[status] || msg } } />
      </form>
    );
  }
}

export default SubscribeForm
