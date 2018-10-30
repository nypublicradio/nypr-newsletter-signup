import React, { Component } from "react"
import './RequiredCheckbox.css';

class RequiredCheckbox extends Component {
  state = {
    changed: false,
    checked: this.props.checked || false
  }

  handleChange = e => {
    this.setState({changed: true, checked: e.target.checked});
    this.props.onChange(e.target.checked)
  }

  render() {
    const { message, submitTried } = this.props;
    const { changed, checked } = this.state;
    const hasError = (changed || submitTried) && !checked;
    const error = this.props.error || "This field is required."
    return(
      <div className="RequiredCheckbox">
        <label className="RequiredCheckbox__label">
          <input 
            type="checkbox"
            checked={checked}
            className="RequiredCheckbox__checkbox"
            onChange={this.handleChange} />
            <span className={`RequiredCheckbox__custom-checkbox ${hasError && 'error'}`}></span>
          <div className="RequiredCheckbox__text" dangerouslySetInnerHTML={{__html:message}} />
        </label>
        {hasError && 
          <div className="RequiredCheckbox__error">{error}</div>
        }
      </div>
    );
  }
}

export default RequiredCheckbox