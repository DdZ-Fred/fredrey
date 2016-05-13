import React, { PropTypes } from 'react';
import ContactFormModal from './ContactFormModal';
import SemanticIcon from './icons/SemanticIcon';

const propTypes = {
  socialProfiles: PropTypes.array.isRequired,
};

class Contact extends React.Component {

  handleClick() {
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
          <div className="content">
            Click <button
                    className="ui mini basic blue button"
                    onClick={this.handleClick}>
                      here
                  </button> to contact me.
            <br /><br />
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
}

Contact.propTypes = propTypes;

export default Contact;
