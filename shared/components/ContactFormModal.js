/*
  global grecaptcha
 */
import React, { PropTypes } from 'react';
import axios from 'axios';


const propTypes = {
  hasOpened: PropTypes.bool.isRequired,
  updateState: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

class ContactFormModal extends React.Component {
  constructor(props) {
    super(props);
    // Put bindings here if necessary
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('ContactBackSide.js: handleSubmit()');

    const email = e.target.elements[0].value;
    const fullname = e.target.elements[1].value;
    const message = e.target.elements[2].value;
    const captchaRes = e.target.elements['g-recaptcha-response'].value;
    // console.log(`Email: ${email}\n Fullname: ${fullname}\n Message: ${message}\n reCaptchaRes: ${captchaRes}`);

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

            <form method="POST" className="ui form" onSubmit={this.handleSubmit}>
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

              {/* <div class="g-recaptcha" data-sitekey="6LcVnx8TAAAAAH9NmpieueQZWJF-rpjMBlBfOpKu">
              </div>*/}
              <div id="myRecaptcha" className="field">

              </div>

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

  componentDidMount() {
    $('.ui.modal')
      .modal({
        onShow: () => {
          if (!this.props.hasOpened) {
            console.log('ContactFormModal is showing for the first time!');
            grecaptcha.render('myRecaptcha', {
              sitekey: '6LcVnx8TAAAAAH9NmpieueQZWJF-rpjMBlBfOpKu',
            });
            this.props.updateState();
            console.log('ContactFormModal state updated!');
          } else {
            console.log('ContactFormModal is showing again!');
            grecaptcha.reset();
          }
        },
        onHide: () => {
          console.log('ContactFormModal is now hiding');
        },
      });
  }

}

ContactFormModal.propTypes = propTypes;

export default ContactFormModal;
