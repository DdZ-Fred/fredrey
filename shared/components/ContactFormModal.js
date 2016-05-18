/*
  global grecaptcha
 */
import React, { PropTypes } from 'react';
import { resetSemanticInvalidForm } from '../utils';
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

    const isValidForm = $('.ui.form').form('is valid');
    const captchaRes = e.target.elements['g-recaptcha-response'].value;

    if (isValidForm && captchaRes) {
      alert('Form inputs and Captcha are valid!');
    } else {
      let tempStr = '';
      tempStr += isValidForm ? 'Form is valid!\n' : 'Form is invalid\n';
      tempStr += captchaRes ? 'Captcha ok' : 'Captcha failed';
      alert(tempStr);
    }
  }

  render() {
    return (
      <div id="contactFormModal" className="ui modal">
        <div className="content">
          <div className="ui center aligned raised padded segment">
            <h3 className="ui icon header">
              <i className="headerIcon circular inverted blue lightning icon"></i>
              <p className="headerText">Quick Form</p>
            </h3>

            <br />

            <form className="ui form"
                onSubmit={this.handleSubmit}>

              <div className="fields">
                <div className="eight wide field">
                  <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    placeholder="Full name"/>
                </div>
                <div className="eight wide field">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"/>
                </div>
              </div>

              <div className="sixteen wide field">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  cols="30"
                  rows="3"></textarea>
              </div>

              <div className="ui success message"></div>
              <div className="ui error message"></div>

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
    // Contact form modal initialization
    $('.ui.modal').modal({
      onShow: () => {
        if (!this.props.hasOpened) {
          console.log('ContactFormModal is showing for the first time!');
          grecaptcha.render('myRecaptcha', {
            sitekey: '6LcVnx8TAAAAAH9NmpieueQZWJF-rpjMBlBfOpKu',
          });
          this.props.updateState();
          console.log('ContactFormModal state just updated!');
        } else {
          console.log('ContactFormModal is showing again!');
          grecaptcha.reset();
        }
      },
      onHide: () => {
        console.log('ContactFormModal is now hiding');
        document.querySelector('.ui.modal form').reset();
        const isValidForm = $('.ui.form').form('is valid');
        if (!isValidForm) {
          resetSemanticInvalidForm('.ui.form');
        }
      },
    });

    // Form validation initialization
    $('.ui.form').form({
      revalidate: true,
      fields: {
        fullname: {
          identifier: 'fullname',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your full name',
            },
          ],
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your email',
            },
            {
              type: 'email',
              prompt: 'Please enter a valid email',
            },
          ],
        },
        message: {
          identifier: 'message',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a message',
            },
          ],
        },
      },
    });
  }

}

ContactFormModal.propTypes = propTypes;

export default ContactFormModal;
