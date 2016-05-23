/*
  global grecaptcha
 */
import React, { PropTypes } from 'react';
import { resetSemanticInvalidForm } from '../utils';
import { handleContactMeErrors } from '../../client/errorHandlers';
import axios from 'axios';


const propTypes = {
  hasOpened: PropTypes.bool.isRequired,
  updateState: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

class ContactFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log('ContactBackSide.js: handleSubmit()');

    const isValidForm = $('.ui.form').form('is valid');
    // const captchaResponse = grecaptcha.getResponse();
    const recaptchaResponse = e.target.elements['g-recaptcha-response'].value;

    if (isValidForm && recaptchaResponse) {
      // Disable submit button
      document.getElementById('submitContactFormBtn').classList.add('disabled');

      const fullname = e.target.elements['fullname'].value;
      const email = e.target.elements['email'].value;
      const message = e.target.elements['message'].value;

      axios.post('/contactMe', {
        fullname,
        email,
        message,
        recaptchaResponse,
      })
      .then(({ data }) => {
        alert(data.message);
        $('.ui.modal').modal('hide');
        document.getElementById('submitContactFormBtn').classList.remove('disabled');
      })
      .catch((contactMeRequestResponse) => {
        /*
          ERROR TYPES:
            - missing_data

            - recaptcha_check_failed
            - recaptcha_server_error
            - recaptcha_not_found
            - recaptcha_bad_request
            - recaptcha_other_error

            - mailgun_bad_request
            - mailgun_unauthorized
            - mailgun_request_failed
            - mailgun_not_found
            - mailgun_server_error
         */
        handleContactMeErrors(contactMeRequestResponse);
      });
    }
  }

  render() {
    return (
      <div id="contactFormModal" className="ui long modal contact">
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

              <div className="fields">
                <div id="myRecaptcha" className="eight wide field">
                </div>
                <div className="ui error message eight wide field">
                </div>
              </div>

              <br />

              <div className="ui buttons">
                <button className="ui button"
                  onClick={this.props.closeModal}>Cancel</button>
                <div className="or"></div>
                <button
                  id="submitContactFormBtn"
                  className="ui blue button"
                  type="submit">Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Contact form modal initialization
    $('#contactFormModal').modal({
      allowMultiple: true,
      closable: false,
      onShow: () => {
        if (!this.props.hasOpened) {
          // Modal is showing for the first time
          grecaptcha.render('myRecaptcha', {
            sitekey: '6LcVnx8TAAAAAH9NmpieueQZWJF-rpjMBlBfOpKu',
          });
          this.props.updateState();
        } else {
          // Modal is re-opening
          grecaptcha.reset();
        }
      },
      onHide: () => {
        // Modal is hiding. Clean the form
        document.querySelector('.ui.form').reset();
        const isValidForm = $('.ui.form').form('is valid');
        if (!isValidForm) {
          resetSemanticInvalidForm();
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
