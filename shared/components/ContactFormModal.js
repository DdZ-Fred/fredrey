import React, { PropTypes } from 'react';


const propTypes = {
  closeModal: PropTypes.func.isRequired,
};

class ContactFormModal extends React.Component {
  constructor(props) {
    super(props);
    // Put bindings here if necessary
  }

  handleSubmit(e) {
    console.log('ContactBackSide.js: handleSubmit()');
    e.preventDefault();
    const email = e.target.elements[0].value;
    const fullname = e.target.elements[1].value;
    const message = e.target.elements[2].value;
    console.log(`Email: ${email}\n Fullname: ${fullname}\n Message: ${message}`);
  }

  render() {
    return (
      <div id="contactFormModal" className="ui modal">
        <div className="content">
          <div className="ui center aligned raised padded segment">
            <h3 className="ui icon header">
              <i className="headerIcon circular inverted blue send icon"></i>
              <p className="headerText">Quick Form</p>
            </h3>

            <br />

            <form className="ui form" onSubmit={this.handleSubmit}>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"/>
              </div>
              <div className="field">
                <label htmlFor="fullname">Full name</label>
                <input
                  id="fullname"
                  type="text"
                  name="fullname"
                  placeholder="Enter your full name"/>
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  cols="30"
                  rows="4"></textarea>
              </div>
              ADD reCAPTCHA HERE
              <br />
              <div className="ui buttons">
                <button className="ui button"
                  onClick={this.props.closeModal}>Cancel</button>
                <div className="or"></div>
                <button className="ui blue button" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

ContactFormModal.propTypes = propTypes;

export default ContactFormModal;
