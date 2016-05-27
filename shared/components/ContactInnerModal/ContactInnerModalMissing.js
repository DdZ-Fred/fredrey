/* global grecaptcha */
import React, { PropTypes } from 'react';

const propTypes = {
  content: PropTypes.string.isRequired,
};

class ContactInnerModalMissing extends React.Component {
  render() {
    return (
      <div id="contactInnerModalMissing" className="ui small modal contact innerModal">
        <div className="ui center aligned header">
          <i className="orange meh icon"></i>
        Information missing!
        </div>
        <div className="content">
          {this.props.content}
        </div>
        <div className="actions">
          <div className="ui approve button">Continue</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Modal initialiaztion
    $('.innerModal').modal({
      allowMultiple: true,
      closable: false,
      onShow: () => {
        // Show (Outer) Form Modal dimmer
        $('#contactFormModal').dimmer('show');
      },
      onHide: () => {
        // Reset reCAPTCHA
        grecaptcha.reset();

        document.getElementById('submitContactFormBtn').classList.remove('disabled');
        // Hide (Outer) Form Modal dimmer so that user can resubmit form or Cancel!
        $('#contactFormModal').dimmer('hide');
      },
    });
  }
}

ContactInnerModalMissing.propTypes = propTypes;

export default ContactInnerModalMissing;
