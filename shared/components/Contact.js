import React, { PropTypes } from 'react';
import ContactFormModal from './ContactFormModal';
import ContactInnerModalContainer from './ContactInnerModal/ContactInnerModalContainer';
import { copyToClipboard } from '../utils';

const propTypes = {
  formModalOpened: PropTypes.bool.isRequired,
  innerModalType: PropTypes.string.isRequired,
  innerModalContent: PropTypes.string.isRequired,
  updateContactFormModalState: PropTypes.func.isRequired,
  updateContactInnerModalState: PropTypes.func.isRequired,
};

class Contact extends React.Component {

  handleCopyEmailToClipboard() {
    console.log('Contact.js: handleCopyEmailToClipboard - Email icon pushed');

    // #TODO:30 Add alternative code for when the copy doesn't work
    if (copyToClipboard('Frederic.Rey.Pro@gmail.com')) {
      // Show copy success message
      console.log('Copy to clipboard Succeeded');
    } else {
      console.log('Copy to clipboard Failed');
      // Copy to clipboard not compatible
      // Show alternative message
    }
  }

  handleOpenFormModal() {
    $('#contactFormModal').modal('show');
  }

  handleCloseFormModal(e) {
    e.preventDefault();
    $('#contactFormModal').modal('hide');
  }

  // DONE:10 Update LinkedIn icon (Rendering issue on Chrome)
  render() {
    return (
      <div id="contact" className="eight wide column">
        <div className="ui segment">
          <a className="ui blue right ribbon label">
            <h3>Contact</h3>
          </a>
          <div className="mainContent">

            <div id="contactTop">
              <p>We can get in touch by:</p>
              <i
                id="contactEmailIcon"
                title="Click to copy to clipboard!"
                className="blue mail link icon"
                onClick={this.handleCopyEmailToClipboard}></i>
              <span id="contactEmail">Frederic.Rey.Pro@gmail.com</span>
              <br />
              <span id="linkedinLine">
                {'or via my'}
                <a
                  href="https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-rey-a2928299"
                  target="_blank">
                  <img id="linkedinIcon" src="/img/png/link-edin.png" alt="LinkedIn Profile"/>
                </a>
                {' profile'}
              </span>
            </div>

            <h5 className="ui blue horizontal divider header">
              <i className="small send icon"></i>
              {'Quick form'}
            </h5>

            <span id="contactBottom">
              {'Click '}
              <button
                className="ui mini basic grey disabled button"
                onClick={this.handleOpenFormModal}>
                {'here'}
              </button>
              {' to contact me.'}
            </span>
          </div>
        </div>
        <ContactFormModal
          hasOpened={this.props.formModalOpened}
          updateState={this.props.updateContactFormModalState}
          closeModal={this.handleCloseFormModal}
          innerModalType={this.props.innerModalType}
          innerModalContent={this.props.innerModalContent}
          updateInnerModalState={this.props.updateContactInnerModalState} />
        <ContactInnerModalContainer
          modalType={this.props.innerModalType}
          modalContent={this.props.innerModalContent} />
      </div>
    );
  }

  componentDidMount() {
    // onMouseOver Popup initialization
    $('#contactEmail').popup({
      inline: true,
      target: '.mail.link.icon',
      content: 'Click the icon to copy the Email!',
    });

    document.getElementById('contactEmail').addEventListener('mouseenter', (e) => {
      e.preventDefault();
      $('#contactEmailIcon').transition('jiggle');
    });
  }

}

Contact.propTypes = propTypes;

export default Contact;
