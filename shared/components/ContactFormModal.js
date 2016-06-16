import React, { PropTypes } from 'react';
import { resetSemanticInvalidForm } from '../utils';
import { handleContactMeErrors } from '../errorHandlers';
import axios from 'axios';


const propTypes = {
  hasOpened: PropTypes.bool.isRequired,
  updateState: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  innerModalType: PropTypes.string.isRequired,
  innerModalContent: PropTypes.string.isRequired,
  updateInnerModalState: PropTypes.func.isRequired,
};

// TODO:10 Override the height of the Modal so that the potentially hidden content can be seen by scrolling.
// OS and browsers sometimes profide features that hide partly
// the content (Ex: Chrome URL bar, iOS bottom bar...) */
class ContactFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const isValidForm = $('.ui.form.contactForm').form('is valid');
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
        if (this.props.innerModalType !== 'success') {
          this.props.updateInnerModalState('success', data.message);
        }
        $('.innerModal').modal('show');
      })
      .catch((contactMeRequestResponse) => {
        handleContactMeErrors(contactMeRequestResponse, this);
      });
    }
  }

  render() {
    return (
      <div id="contactFormModal" className="ui long modal contact blurring dimmable">
        <div className="content">
          <div className="ui center aligned raised padded segment">
            <h3 className="ui icon header">
              <i className="headerIcon circular inverted blue lightning icon"></i>
              <p className="headerText">Quick Form</p>
            </h3>

            <br />

            <form className="ui form contactForm"
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
    // Modal initialization
    $('#contactFormModal').modal({
      allowMultiple: true,
      closable: false,
      onShow: () => {
        if (!this.props.hasOpened) {
          // Modal is showing for the first time
          grecaptcha.render('myRecaptcha', {
            sitekey: '6LcVnx8TAAAAAH9NmpieueQZWJF-rpjMBlBfOpKu',
            size: 'compact',
          });
          this.props.updateState();
        } else {
          // Modal is re-opening
          grecaptcha.reset();
          // check if submit button is disabled
          const isSubmitButtonDisabled = document.getElementById('submitContactFormBtn')
            .classList.contains('disabled');
          if (isSubmitButtonDisabled) {
            document.getElementById('submitContactFormBtn').classList.remove('disabled');
          }
        }
      },
      onHide: () => {
        // Modal is hiding. Clean the form
        document.querySelector('.ui.form.contactForm').reset();
        const isValidForm = $('.ui.form.contactForm').form('is valid');
        if (!isValidForm) {
          // Default param is: '.ui.form'
          resetSemanticInvalidForm('.ui.form.contactForm');
        }
      },
    });

    // Dimmer initialization
    // (hides/blur the component so that user
    // focuses on something else)
    $('#contactFormModal').dimmer({
      inverted: true,
      closable: false,
      duration: {
        show: 400,
        hide: 400,
      },
    });

    // Form validation initialization
    $('.ui.form.contactForm').form({
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
