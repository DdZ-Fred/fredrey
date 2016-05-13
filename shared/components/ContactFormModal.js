import React, { PropTypes } from 'react';

class ContactFormModal extends React.Component {
  constructor() {
    super();
    // Put bindings here
  }

  handleCancel(e) {
    e.preventDefault();
    $('.ui.modal').modal('hide');
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const fullname = e.target.elements[1].value;
    const message = e.target.elements[2].value;
    console.log(`Email: ${email}\n Fullname: ${fullname}\n Message: ${message}`);
  }

  render() {
    return (
      <div id="contactFormModal" className="ui modal">
        <div className="header">Contact me</div>
        <div className="content">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="text" name="email" placeholder="Enter your email"/>
            </div>
            <div className="field">
              <label htmlFor="fullname">Full name</label>
              <input type="text" id="fullname" name="fullname" placeholder="Enter your full name"/>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" cols="30" rows="4"></textarea>
            </div>
            ADD reCAPTCHA HERE
            <br />
            <div className="ui buttons">
              <button className="ui button"
                onClick={this.handleCancel}>Cancel</button>
              <div className="or"></div>
              <button className="ui blue button" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ContactFormModal;
