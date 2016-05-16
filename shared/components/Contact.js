import React, { PropTypes } from 'react';
import ContactFormModal from './ContactFormModal';
import SemanticIcon from './icons/SemanticIcon';
import { copyToClipboard } from '../utils';

const propTypes = {
  socialProfiles: PropTypes.array.isRequired,
};

class Contact extends React.Component {

  handleCopyEmailToClipboard() {
    console.log('Contact.js: handleCopyEmailToClipboard - Email icon pushed');
    const num = Math.floor((Math.random() * 100000) % 50);

    if (copyToClipboard(`COPY-TEST-${num}`)) {
      // Show copy success message
      console.log('Copy to cliplard Succeeded');
    } else {
      console.log('Copy to clipboard Failed');
      // Copy to clipboard not compatible
      // Show alternative message
    }
  }

  handleOpenFormModal() {
    // It is the ContactFormModal component
    $('.ui.modal').modal('show');
  }

  render() {
    return (
      <div id="contact" className="eight wide column">
        <div className="ui segment">
          <a className="ui blue right ribbon label">
            <h3>Contact</h3>
          </a>
          <div className="mainContent">

            <div className="ui centered list">
              <div className="city item">
                <i className="marker icon"></i>
                <div className="content">London, UK</div>
              </div>
              <div className="email item">
                <i title="Click to copy to clipboard!"
                  className="mail link icon"
                  onClick={this.handleCopyEmailToClipboard}></i>
                <div id="contactEmail"
                  className="content">Frederic.Rey.Pro@gmail.com</div>
              </div>
            </div>

            <div className="ui horizontal divider">OR</div>

            Click <button
                    className="ui mini basic blue button"
                    onClick={this.handleOpenFormModal}>
                      here
                  </button> to contact me.
            <br />
            <br />
            Or we can get in touch on:
            <br />
            <i className="big icons">
              {this.props.socialProfiles.map((profile, idx) => (
                <a
                  key={idx}
                  href={profile.url}
                  target="_blank">
                  <SemanticIcon icon={profile.icon} />
                </a>
              ))}
            </i>
            <ContactFormModal />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    $('#contactEmail')
      .popup({
        inline: true,
        target: '.mail.link.icon',
        content: 'Click the icon to copy the Email!',
      });
  }
}

Contact.propTypes = propTypes;

export default Contact;
